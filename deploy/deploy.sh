#!/usr/bin/env bash
set -euo pipefail

IMAGE_TAG="${1:-latest}"
IMAGE="039314424497.dkr.ecr.us-west-2.amazonaws.com/medusa-backend:${IMAGE_TAG}"
COMPOSE_DIR="/home/ubuntu"
COMPOSE_FILE="${COMPOSE_DIR}/docker-compose.yml"
ENV_FILE="${COMPOSE_DIR}/.env"

echo "=== deployment start: ${IMAGE} ==="

if [ ! -f "${COMPOSE_FILE}" ]; then
  echo "ERROR: compose file not found at ${COMPOSE_FILE}"
  exit 1
fi

cd "${COMPOSE_DIR}"

export MEDUSA_IMAGE_TAG="${IMAGE_TAG}"

aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 039314424497.dkr.ecr.us-west-2.amazonaws.com

docker compose -f "${COMPOSE_FILE}" pull medusa

# Apply pending database migrations from the newly pulled image before swapping
# containers, so a failed migration leaves the currently running server up.
echo "=== running db:migrate ==="
docker run --rm \
  --env-file /home/ubuntu/medusa-prod.env \
  "${IMAGE}" \
  node /app/node_modules/.bin/medusa db:migrate

# A `medusa` container created outside this compose project (no or mismatched
# com.docker.compose.project label) blocks `compose up` with a container-name
# conflict. Remove it so compose recreates the service under the expected project.
COMPOSE_PROJECT="$(basename "${COMPOSE_DIR}")"
if [ -n "$(docker ps -aq --filter name=^medusa$)" ]; then
  OWNER="$(docker inspect -f '{{index .Config.Labels "com.docker.compose.project"}}' medusa 2>/dev/null || true)"
  if [ -z "${OWNER}" ] || [ "${OWNER}" != "${COMPOSE_PROJECT}" ]; then
    echo "removing stale medusa container (owner project: '${OWNER:-none}')"
    docker rm -f medusa
  fi
fi

docker compose -f "${COMPOSE_FILE}" up -d --no-deps --force-recreate medusa

docker ps --filter "name=^medusa$" --format "{{.Names}} {{.Image}} {{.Status}}"

# Cleanup: drop old medusa-backend images, keep the running one + latest
RUNNING_IMG=$(docker ps --filter "name=^medusa$" --format "{{.Image}}")
docker images --format "{{.Repository}}:{{.Tag}}" \
  | grep "^039314424497.dkr.ecr.us-west-2.amazonaws.com/medusa-backend:" \
  | while read -r IMG; do
      if [ "${IMG}" != "${RUNNING_IMG}" ] && [ "${IMG}" != "039314424497.dkr.ecr.us-west-2.amazonaws.com/medusa-backend:latest" ]; then
        echo "cleanup: removing ${IMG}"
        docker rmi "${IMG}" 2>/dev/null || true
      fi
    done
docker image prune -f >/dev/null 2>&1 || true

echo "=== deployment done ==="