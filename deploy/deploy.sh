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