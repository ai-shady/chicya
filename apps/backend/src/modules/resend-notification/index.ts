import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import ResendNotificationService from "./service"

const services = [ResendNotificationService]

export default ModuleProvider(Modules.NOTIFICATION, {
  services,
})