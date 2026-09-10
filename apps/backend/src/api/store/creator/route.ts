import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

import type CreatorProfileModuleService from "../../../modules/creator-profile/service"

const CREATOR_PROFILE_MODULE = "creatorProfile"

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve(CREATOR_PROFILE_MODULE) as CreatorProfileModuleService
  const profiles = await service.listCreatorProfiles({ published: true })

  res.json({ profile: profiles[0] ?? null })
}
