import { loadEnv, defineConfig, Modules } from '@medusajs/framework/utils'
import path from 'path'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

const projectDir = process.cwd()

const notificationProviders: {
  resolve: string
  id: string
  options: Record<string, unknown>
}[] = []

if (process.env.SES_FROM_EMAIL) {
  notificationProviders.push({
    resolve: path.join(projectDir, '.medusa/server/src/modules/ses-notification'),
    id: 'ses',
    options: {
      from: process.env.SES_FROM_EMAIL,
      region: process.env.SES_REGION ?? 'us-west-2',
      channels: ['email'],
    },
  })
} else if (process.env.RESEND_API_KEY) {
  notificationProviders.push({
    resolve: path.join(projectDir, '.medusa/server/src/modules/resend-notification'),
    id: 'resend',
    options: {
      api_key: process.env.RESEND_API_KEY,
      from:
        process.env.RESEND_FROM_EMAIL ?? 'CHICYA <no-reply@chicya.com>',
      channels: ['email'],
    },
  })
} else {
  notificationProviders.push({
    resolve: '@medusajs/notification-local',
    id: 'local',
    options: {
      channels: ['email'],
    },
  })
}

const modules = {
  [Modules.TRANSLATION]: {
    resolve: '@medusajs/medusa/translation',
  },
  [Modules.NOTIFICATION]: {
    resolve: '@medusajs/medusa/notification',
    options: {
      providers: notificationProviders,
    },
  },
  ...(process.env.FILE_S3_BUCKET
    ? {
        [Modules.FILE]: {
          resolve: '@medusajs/medusa/file',
          options: {
            providers: [
              {
                resolve: '@medusajs/file-s3',
                id: 's3',
                options: {
                  authentication_method: 'iam-role',
                  bucket: process.env.FILE_S3_BUCKET,
                  region: process.env.FILE_S3_REGION ?? 'us-west-2',
                  file_url: process.env.FILE_S3_PUBLIC_URL,
                  acl: false,
                  ...(process.env.FILE_S3_ENDPOINT
                    ? { endpoint: process.env.FILE_S3_ENDPOINT }
                    : {}),
                },
              },
            ],
          },
        },
      }
    : {}),
}

const databaseDriverOptions = process.env.DATABASE_DRIVER_OPTIONS
  ? JSON.parse(process.env.DATABASE_DRIVER_OPTIONS)
  : undefined

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    ...(databaseDriverOptions ? { databaseDriverOptions } : {}),
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET,
      cookieSecret: process.env.COOKIE_SECRET,
    }
  },
  modules,
  featureFlags: {
    translation: true,
  },
})
