import { defineRouteConfig } from "@medusajs/admin-sdk"
import { Button, Container, Heading, Input, Label, Textarea, toast } from "@medusajs/ui"
import Medusa from "@medusajs/js-sdk"
import { useEffect, useState } from "react"

const sdk = new Medusa({ baseUrl: "/" })

type Profile = {
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
  skills?: string[] | null
  published: boolean
}

const emptyProfile: Profile = {
  name: "Shady",
  role: "",
  bio: "",
  avatar_url: "",
  location: "",
  company: "",
  website_url: "",
  github_username: "ai-shady",
  github_url: "https://github.com/ai-shady",
  linkedin_url: "",
  public_repos: 0,
  followers: 0,
  following: 0,
  skills: [],
  published: true,
}

const CreatorPage = () => {
  const [profile, setProfile] = useState<Profile>(emptyProfile)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    sdk.client
      .fetch<{ profile: Profile | null }>("/admin/creator")
      .then(({ profile: saved }) => saved && setProfile(saved))
      .finally(() => setLoading(false))
  }, [])

  const update = (field: keyof Profile, value: string | number | boolean) => {
    setProfile((current) => ({ ...current, [field]: value }))
  }

  const save = async () => {
    setSaving(true)
    try {
      await sdk.client.fetch("/admin/creator", {
        method: "PUT",
        body: profile,
      })
      toast.success("Creator profile saved")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <Container>Loading...</Container>

  return (
    <Container className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <Heading level="h1">Creator Profile</Heading>
        <Button onClick={save} isLoading={saving}>Save changes</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {(["name", "role", "avatar_url", "location", "company", "website_url", "github_username", "github_url", "linkedin_url"] as const).map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <Label htmlFor={field}>{field.replaceAll("_", " ")}</Label>
            <Input id={field} value={profile[field] ?? ""} onChange={(event) => update(field, event.target.value)} />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="bio">bio</Label>
        <Textarea id="bio" value={profile.bio ?? ""} onChange={(event) => update("bio", event.target.value)} />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {(["public_repos", "followers", "following"] as const).map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <Label htmlFor={field}>{field.replaceAll("_", " ")}</Label>
            <Input id={field} type="number" value={profile[field] ?? 0} onChange={(event) => update(field, Number(event.target.value))} />
          </div>
        ))}
      </div>
    </Container>
  )
}

export const config = defineRouteConfig({ label: "Creator Profile" })

export default CreatorPage
