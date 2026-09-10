import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

import CreatorProfileModuleService from "../../../modules/creator-profile/service"
import { CREATOR_PROFILE_MODULE } from "../../../modules/creator-profile"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve(CREATOR_PROFILE_MODULE) as CreatorProfileModuleService
  const profiles = await service.listCreatorProfiles({ published: true })

  res.json({ profile: profiles[0] ?? null })
}
