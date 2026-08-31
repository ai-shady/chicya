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
docker compose -f "${COMPOSE_FILE}" up -d --no-deps medusa

docker ps --filter "name=^medusa$" --format "{{.Names}} {{.Image}} {{.Status}}"
echo "=== deployment done ==="