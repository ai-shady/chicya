import {
  ContainerRegistrationKeys,
  Modules,
} from "@medusajs/framework/utils"
import type { SubscriberArgs, SubscriberConfig } from "@medusajs/medusa"

export default async function resetPasswordTokenHandler({
  event,
  container,
}: SubscriberArgs<{
  entity_id: string
  token: string
  actor_type: string
}>) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const notificationService = container.resolve(Modules.NOTIFICATION)

  const email = event.data?.entity_id
  const token = event.data?.token
  const actorType = event.data?.actor_type

  if (!email || !token) {
    return
  }

  const adminUrl = process.env.ADMIN_URL ?? "https://medusa.chicya.com"
  const resetUrl = `${adminUrl}/app/reset-password?token=${token}&email=${email}`

  try {
    await notificationService.createNotifications({
      to: email,
      channel: "email",
      template: "password-reset",
      trigger_type: "auth.password_reset",
      resource_id: email,
      data: {
        subject: "Reset your CHICYA password",
        html: `<p>Hello,</p><p>We received a request to reset the password for <strong>${email}</strong>.</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in 15 minutes. If you did not request this, you can safely ignore this email.</p>`,
      },
    })
  } catch (error: any) {
    logger.error(
      `Failed to send reset password email for ${email}: ${error.message}`
    )
  }
}

export const config: SubscriberConfig = {
  event: "auth.password_reset",
}