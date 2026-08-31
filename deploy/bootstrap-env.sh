#!/usr/bin/env bash
set -euo pipefail

# One-time bootstrap: derive compose variable file (/home/ubuntu/.env) from the
# existing medusa-prod.env. Values are never echoed.

PROD_ENV="/home/ubuntu/medusa-prod.env"
DOTENV="/home/ubuntu/.env"

if [ ! -f "${PROD_ENV}" ]; then
  echo "ERROR: ${PROD_ENV} not found"
  exit 1
fi

set -a
# shellcheck disable=SC1090
source "${PROD_ENV}"
set +a

redis_pass="${REDIS_URL#redis://:}"
redis_pass="${redis_pass%%@*}"
pg_pass="${DATABASE_URL#postgresql://medusa:}"
pg_pass="${pg_pass%%@*}"

umask 077
cat > "${DOTENV}" <<EOF
POSTGRES_PASSWORD=${pg_pass}
REDIS_REQUIREPASS=${redis_pass}
MEDUSA_IMAGE_TAG=latest
EOF

echo "wrote ${DOTENV} ($(wc -l < "${DOTENV}") keys, values not shown)"