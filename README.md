# Chicya — Headless Commerce Platform

A production headless e-commerce platform for **Chicya**, a direct-to-consumer electronics brand, powered by [Medusa](https://medusajs.com) + [Next.js](https://nextjs.org). Deployed to AWS and Vercel with fully automated CI/CD.

**Live:**

- Storefront: [chicya.com](https://chicya.com) / [www.chicya.com](https://www.chicya.com)
- Admin dashboard: [medusa.chicya.com/app](https://medusa.chicya.com/app)

## What's inside

| App | Stack | Deployment |
|-----|-------|------------|
| `apps/backend` | Medusa 2.19 · Node.js · PostgreSQL · Redis | AWS EC2 (Docker) |
| `apps/storefront` | Next.js 15 · React 19 · TanStack · Stripe | Vercel |

This is a [Turborepo](https://turbo.build) monorepo using npm workspaces.

## Features

- Full Medusa commerce core: products, variants, carts, multi-step checkout, payments (Stripe), promotions, regions, customer accounts & order history
- Multi-region storefront with locale-first routing (`/cn`, `/en`) and automatic country detection
- Email notifications via **SES** and **Resend** custom modules, wired to events (e.g. invite-created)
- Medusa **translation** module + admin dashboard i18n
- Image storage on **AWS S3** with CDN (`assets.chicya.com`)
- Automated pipelines: backend image build (arm64) → ECR → SSM deploy to EC2; storefront auto-deploy to Vercel

## Architecture

```text
┌─────────────┐     ┌──────────────────────────┐     ┌─────────────────┐
│  Vercel     │     │  AWS EC2 (Docker)        │     │  AWS Services   │
│  Storefront │────▶│  Medusa backend :9000    │────▶│  PostgreSQL     │
│  Next.js 15 │HTTPS│  + Redis                 │     │  Redis          │
│             │     │  (docker-compose)        │     │  S3 · SES       │
└─────────────┘     └──────────────────────────┘     └─────────────────┘
        ▲                          ▲
        │   GitHub Actions (CI)    │   push to main
        └──────────────────────────┘
```

## Getting Started

### Prerequisites

- Node.js v20+
- PostgreSQL 15+
- npm 11+

### Local Development

```bash
npm install

# 1. Backend
cp apps/backend/.env.template apps/backend/.env
# set DATABASE_URL, JWT_SECRET, COOKIE_SECRET, REDIS_URL, CORS in apps/backend/.env
cd apps/backend && npm exec medusa db:migrate && npm run dev

# 2. Storefront (new terminal)
cp apps/storefront/.env.template apps/storefront/.env.local
# set MEDUSA_BACKEND_URL, NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY, NEXT_PUBLIC_BASE_URL, NEXT_PUBLIC_DEFAULT_REGION, Stripe keys, REVALIDATE_SECRET
cd apps/storefront && npm run dev
```

- Backend admin: `http://localhost:9000/app`
- Storefront: `http://localhost:8000`

Or from the repo root run `npm run dev` to start both apps via Turborepo.

### Seed data

```bash
npm run backend:seed
```

## Deployment

### Backend (AWS EC2)

Pushing to `main` with changes under `apps/backend/`, `deploy/`, or the Dockerfile triggers [deploy-backend.yml](.github/workflows/deploy-backend.yml):

1. `medusa build` on a native arm64 runner
2. Docker image built via buildx (`linux/arm64`) and pushed to **Amazon ECR** (`:SHA` + `:latest`)
3. Async **SSM Run Command** on EC2 pulls the image and recreates the `medusa` container with `docker compose`

Infrastructure lives in [`deploy/`](deploy): `docker-compose.yml` (postgres, redis, medusa), `deploy.sh` (pull & recreate), `bootstrap-env.sh` (one-time env setup).

### Storefront (Vercel)

Pushing to `main` auto-deploys the storefront to Vercel (root directory `apps/storefront`).

## Configuration

Key env vars — see `apps/backend/.env.template` and `apps/storefront/.env.template`.

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Backend PostgreSQL connection string |
| `REDIS_URL` | Backend Redis connection string |
| `JWT_SECRET` / `COOKIE_SECRET` | Backend auth secrets |
| `SES_FROM_EMAIL` | Enables the SES notification provider |
| `RESEND_API_KEY` | Enables the Resend notification provider |
| `FILE_S3_BUCKET` | Enables S3 file storage |
| `MEDUSA_BACKEND_URL` | Storefront → backend URL |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Storefront publishable API key |
| `NEXT_PUBLIC_STRIPE_KEY` | Stripe publishable key |

## License

MIT — see [LICENSE](LICENSE).

---

# Chicya — 无头电商平台

面向 **Chicya** 消费电子 DTC 品牌的生产级无头电商平台，基于 [Medusa](https://medusajs.com) + [Next.js](https://nextjs.org)，部署于 AWS 与 Vercel，全自动化 CI/CD。

**在线地址:**

- 商城: [chicya.com](https://chicya.com) / [www.chicya.com](https://www.chicya.com)
- 管理后台: [medusa.chicya.com/app](https://medusa.chicya.com/app)

## 项目结构

| 应用 | 技术栈 | 部署 |
|-----|-------|------|
| `apps/backend` | Medusa 2.19 · Node.js · PostgreSQL · Redis | AWS EC2 (Docker) |
| `apps/storefront` | Next.js 15 · React 19 · TanStack · Stripe | Vercel |

基于 [Turborepo](https://turbo.build) 的 npm workspace 单仓库（monorepo）。

## 功能亮点

- Medusa 完整电商内核: 商品、SKU、购物车、多步结算、支付(Stripe)、促销、多区域、客户账户与订单历史
- 多语言商城，locale-first 路由（`/cn`、`/en`），自动国家/地区识别
- 基于 **SES** 与 **Resend** 的自定义模块实现邮件通知（如邀请用户事件）
- Medusa **翻译**模块 + 管理后台国际化
- **AWS S3** 图片存储，CDN 分发（`assets.chicya.com`）
- 自动化流水线: 后端 arm64 镜像构建 → ECR → SSM 部署到 EC2；商城自动部署到 Vercel

## 架构

```text
┌─────────────┐     ┌──────────────────────────┐     ┌─────────────────┐
│  Vercel     │     │  AWS EC2 (Docker)        │     │  AWS Services   │
│  商城       │────▶│  Medusa 后端 :9000       │────▶│  PostgreSQL     │
│  Next.js 15 │HTTPS│  + Redis                 │     │  Redis          │
│             │     │  (docker-compose)        │     │  S3 · SES       │
└─────────────┘     └──────────────────────────┘     └─────────────────┘
        ▲                          ▲
        │   GitHub Actions (CI)    │   push 到 main
        └──────────────────────────┘
```

## 本地开发

### 环境要求

- Node.js v20+
- PostgreSQL 15+
- npm 11+

```bash
npm install

# 1. 后端
cp apps/backend/.env.template apps/backend/.env
# 在 apps/backend/.env 中配置 DATABASE_URL、JWT_SECRET、COOKIE_SECRET、REDIS_URL、CORS
cd apps/backend && npm exec medusa db:migrate && npm run dev

# 2. 商城（新终端）
cp apps/storefront/.env.template apps/storefront/.env.local
# 配置 MEDUSA_BACKEND_URL、NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY、NEXT_PUBLIC_BASE_URL、
# NEXT_PUBLIC_DEFAULT_REGION、Stripe 相关 key、REVALIDATE_SECRET
cd apps/storefront && npm run dev
```

- 后台: `http://localhost:9000/app`
- 商城: `http://localhost:8000`

也可以在仓库根目录执行 `npm run dev` 通过 Turborepo 同时启动两个应用。

### 种子数据

```bash
npm run backend:seed
```

## 部署

### 后端 (AWS EC2)

推送 `main` 分支，且变更涉及 `apps/backend/`、`deploy/` 或 Dockerfile 时，会自动触发 [deploy-backend.yml](.github/workflows/deploy-backend.yml):

1. 在原生 arm64 runner 上执行 `medusa build`
2. 通过 buildx 构建 `linux/arm64` Docker 镜像并推送至 **Amazon ECR**（`:SHA` 与 `:latest`）
3. 通过 **SSM Run Command** 异步在 EC2 上拉取镜像并用 `docker compose` 重建 `medusa` 容器

基础设施位于 [`deploy/`](deploy): `docker-compose.yml`（postgres、redis、medusa）、`deploy.sh`（拉取并重建）、`bootstrap-env.sh`（一次性环境初始化）。

### 商城 (Vercel)

推送 `main` 分支即自动部署商城到 Vercel（根目录 `apps/storefront`）。

## 配置

主要环境变量参见 `apps/backend/.env.template` 与 `apps/storefront/.env.template`。

| 变量 | 说明 |
|------|------|
| `DATABASE_URL` | 后端 PostgreSQL 连接串 |
| `REDIS_URL` | 后端 Redis 连接串 |
| `JWT_SECRET` / `COOKIE_SECRET` | 后端认证密钥 |
| `SES_FROM_EMAIL` | 启用 SES 通知模块 |
| `RESEND_API_KEY` | 启用 Resend 通知模块 |
| `FILE_S3_BUCKET` | 启用 S3 文件存储 |
| `MEDUSA_BACKEND_URL` | 商城 → 后端地址 |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | 商城 publishable API key |
| `NEXT_PUBLIC_STRIPE_KEY` | Stripe publishable key |

## License

MIT — 见 [LICENSE](LICENSE)。