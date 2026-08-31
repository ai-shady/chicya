import {
  ContainerRegistrationKeys,
  Modules,
  promiseAll,
  remoteQueryObjectFromString,
} from "@medusajs/framework/utils"

export default async function inviteCreatedHandler({
  event,
  container,
}: {
  event: any
  container: any
}) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const notificationService = container.resolve(Modules.NOTIFICATION)
  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY)

  const raw = Array.isArray(event.data) ? event.data : [event.data]
  const inviteIds = raw.map((d: any) => d?.id ?? d).filter(Boolean)

  if (!inviteIds.length) {
    return
  }

  const queryObject = remoteQueryObjectFromString({
    entryPoint: "invite",
    variables: {
      filters: { id: inviteIds },
    },
    fields: ["id", "email", "token"],
  })

  const invites = await remoteQuery(queryObject)

  const adminUrl = process.env.ADMIN_URL ?? "https://medusa.chicya.com"

  await promiseAll(
    invites.map(async (invite: any) => {
      const inviteLink = `${adminUrl}/invite?token=${invite.token}`

      try {
        await notificationService.createNotifications({
          to: invite.email,
          channel: "email",
          template: "invite-created",
          trigger_type: "invite.created",
          resource_id: invite.id,
          data: {
            subject: "You have been invited to join CHICYA",
            html: `<p>Hi,</p><p>You have been invited to join the <strong>CHICYA</strong> admin team.</p><p><a href="${inviteLink}">Accept the invitation</a></p><p>This invitation link expires in 24 hours. If you did not expect this invitation, you can safely ignore this email.</p>`,
          },
        })
      } catch (error: any) {
        logger.error(
          `Failed to send invite email for ${invite.email}: ${error.message}`
        )
      }
    })
  )
}

export const config = {
  event: "invite.created",
  context: {
    subscriberId: "invite-created-handler",
  },
}