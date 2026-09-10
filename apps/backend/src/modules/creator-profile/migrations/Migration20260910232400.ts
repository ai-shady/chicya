import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20260910232400 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      insert into "creator_profile" (
        "id",
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
        "public_repos",
        "followers",
        "following",
        "skills",
        "published"
      )
      values (
        'creator_ai_shady',
        'ai-shady',
        'Shady',
        'Senior Full-Stack JS Engineer',
        '18+ years of JavaScript and 11 years of global e-commerce experience. Building with React, Next.js, Node.js, NestJS, MedusaJS, AWS, and Shopify.',
        'https://avatars.githubusercontent.com/u/83744265?v=4',
        'Changsha, China',
        'Miracle Miles Group',
        'https://www.chicya.com',
        'ai-shady',
        'https://github.com/ai-shady',
        73,
        19,
        22,
        '{"items":["JavaScript","React","Next.js","Node.js","NestJS","MedusaJS","AWS","Shopify"]}'::jsonb,
        true
      )
      on conflict ("id") do nothing;
    `)
  }

  async down(): Promise<void> {
    this.addSql(
      `delete from "creator_profile" where "id" = 'creator_ai_shady';`
    )
  }
}
