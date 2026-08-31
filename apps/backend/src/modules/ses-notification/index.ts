import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import SesNotificationService from "./service"

export default ModuleProvider(Modules.NOTIFICATION, {
  services: [SesNotificationService],
})