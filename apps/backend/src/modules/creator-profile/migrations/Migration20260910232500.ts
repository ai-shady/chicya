import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20260910232500 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      update "creator_profile"
      set
        "name" = 'Shady',
        "role" = 'Senior Full-Stack JS Engineer',
        "bio" = '18+ years of JavaScript and 11 years of global e-commerce experience. Building with React, Next.js, Node.js, NestJS, MedusaJS, AWS, and Shopify.',
        "avatar_url" = 'https://avatars.githubusercontent.com/u/83744265?v=4',
        "location" = 'Changsha, China',
        "company" = 'Miracle Miles Group',
        "website_url" = 'https://www.chicya.com',
        "github_username" = 'ai-shady',
        "github_url" = 'https://github.com/ai-shady',
        "public_repos" = 73,
        "followers" = 19,
        "following" = 22,
        "skills" = '{"items":["JavaScript","React","Next.js","Node.js","NestJS","MedusaJS","AWS","Shopify"]}'::jsonb,
        "published" = true,
        "updated_at" = now()
      where "slug" = 'ai-shady';
    `)
  }

  async down(): Promise<void> {
    this.addSql(`
      update "creator_profile"
      set
        "role" = null,
        "bio" = null,
        "avatar_url" = null,
        "location" = null,
        "company" = null,
        "website_url" = null,
        "public_repos" = null,
        "followers" = null,
        "following" = null,
        "skills" = null
      where "slug" = 'ai-shady';
    `)
  }
}
