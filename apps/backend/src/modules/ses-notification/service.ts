import {
  AbstractNotificationProviderService,
  MedusaError,
} from "@medusajs/framework/utils"
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2"

export type SesNotificationServiceOptions = {
  from: string
  region?: string
}

class SesNotificationService extends AbstractNotificationProviderService {
  static identifier = "ses"
  protected config_: SesNotificationServiceOptions
  protected logger_: any
  protected client_: SESv2Client

  constructor(container: any, options: SesNotificationServiceOptions) {
    super()
    this.config_ = options
    this.logger_ = container.logger
    this.client_ = new SESv2Client({
      region: options.region ?? "us-west-2",
    })
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
        `Subject and HTML content are required to send an email via SES`
      )
    }

    try {
      await this.client_.send(
        new SendEmailCommand({
          FromEmailAddress: from,
          Destination: {
            ToAddresses: [notification.to],
          },
          Content: {
            Simple: {
              Subject: { Data: subject },
              Body: { Html: { Data: html } },
            },
          },
        })
      )

      return {}
    } catch (error: any) {
      this.logger_.error(`Failed to send email via SES: ${error.message}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        `Failed to send email: ${error.message}`
      )
    }
  }
}

export default SesNotificationService