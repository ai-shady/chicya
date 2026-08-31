import {
  AbstractNotificationProviderService,
  MedusaError,
} from "@medusajs/framework/utils"

export type ResendNotificationServiceOptions = {
  api_key: string
  from: string
}

class ResendNotificationService extends AbstractNotificationProviderService {
  static identifier = "resend"
  protected config_: ResendNotificationServiceOptions
  protected logger_: any

  constructor(container: any, options: ResendNotificationServiceOptions) {
    super()
    this.config_ = options
    this.logger_ = container.logger
  }

  async send(notification: any) {
    if (!notification) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `No notification information provided`
      )
    }

    const from = notification.from?.trim() || this.config_.from
    const subject = notification.content?.subject ?? notification.data?.subject
    const html = notification.content?.html ?? notification.data?.html

    if (!subject || !html) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Subject and HTML content are required to send an email via Resend`
      )
    }

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.config_.api_key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [notification.to],
          subject,
          html,
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new MedusaError(
          MedusaError.Types.UNEXPECTED_STATE,
          `Resend API error ${response.status}: ${text}`
        )
      }

      return {}
    } catch (error: any) {
      this.logger_.error(
        `Failed to send email via Resend: ${error.message}`
      )
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to send email: ${error.message}`
      )
    }
  }
}

export default ResendNotificationService