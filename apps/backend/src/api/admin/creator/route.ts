import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

import CreatorProfileModuleService from "../../../modules/creator-profile/service"
import { CREATOR_PROFILE_MODULE } from "../../../modules/creator-profile"

const editableFields = [
  "slug",
  "name",
  "role",
  "bio",
  "avatar_url",
  "location",
  "company",
  "website_url",
  "github_username",
  "github_url",
  "linkedin_url",
  "public_repos",
  "followers",
  "following",
  "skills",
  "published",
] as const

function getPayload(body: Record<string, unknown>) {
  return Object.fromEntries(
    editableFields
      .filter((field) => body[field] !== undefined)
      .map((field) => [field, body[field]])
  )
}

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve(CREATOR_PROFILE_MODULE) as CreatorProfileModuleService
  const profiles = await service.listCreatorProfiles({})

  res.json({ profile: profiles[0] ?? null })
}

export async function PUT(req: MedusaRequest, res: MedusaResponse) {
  const service = req.scope.resolve(CREATOR_PROFILE_MODULE) as CreatorProfileModuleService
  const body = req.body as Record<string, unknown>
  const profiles = await service.listCreatorProfiles({})
  const payload = getPayload(body)

  const profile = profiles[0]
    ? await service.updateCreatorProfiles({
        id: profiles[0].id,
        ...payload,
      })
    : await service.createCreatorProfiles(payload)

  res.json({ profile: Array.isArray(profile) ? profile[0] : profile })
}
