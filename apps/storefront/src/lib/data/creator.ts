"use server"

import { sdk } from "@lib/config"

export type CreatorProfile = {
  name: string
  role?: string | null
  bio?: string | null
  avatar_url?: string | null
  location?: string | null
  company?: string | null
  website_url?: string | null
  github_username?: string | null
  github_url?: string | null
  linkedin_url?: string | null
  public_repos?: number | null
  followers?: number | null
  following?: number | null
  skills?: { items?: string[] } | null
  published: boolean
}

export async function retrieveCreatorProfile() {
  const { profile } = await sdk.client.fetch<{ profile: CreatorProfile | null }>(
    "/store/creator",
    { method: "GET", cache: "no-store" }
  )

  return profile
}
