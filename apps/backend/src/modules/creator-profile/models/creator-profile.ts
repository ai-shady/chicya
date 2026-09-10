import { model } from "@medusajs/framework/utils"

const CreatorProfile = model.define("creator_profile", {
  id: model.id().primaryKey(),
  slug: model.text().unique(),
  name: model.text(),
  role: model.text().nullable(),
  bio: model.text().nullable(),
  avatar_url: model.text().nullable(),
  location: model.text().nullable(),
  company: model.text().nullable(),
  website_url: model.text().nullable(),
  github_username: model.text().nullable(),
  github_url: model.text().nullable(),
  linkedin_url: model.text().nullable(),
  public_repos: model.number().nullable(),
  followers: model.number().nullable(),
  following: model.number().nullable(),
  skills: model.json().nullable(),
  published: model.boolean().default(true),
})

export default CreatorProfile
