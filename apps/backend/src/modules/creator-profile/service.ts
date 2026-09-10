import { MedusaService } from "@medusajs/framework/utils"

import CreatorProfile from "./models/creator-profile"

class CreatorProfileModuleService extends MedusaService({
  CreatorProfile,
}) {}

export default CreatorProfileModuleService
