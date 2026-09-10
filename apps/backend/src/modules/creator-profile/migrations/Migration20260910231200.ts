import { Migration } from "@medusajs/framework/mikro-orm/migrations"

export class Migration20260910231200 extends Migration {
  async up(): Promise<void> {
    this.addSql(`
      create table if not exists "creator_profile" (
        "id" text not null,
        "slug" text not null,
        "name" text not null,
        "role" text null,
        "bio" text null,
        "avatar_url" text null,
        "location" text null,
        "company" text null,
        "website_url" text null,
        "github_username" text null,
        "github_url" text null,
        "linkedin_url" text null,
        "public_repos" integer null,
        "followers" integer null,
        "following" integer null,
        "skills" jsonb null,
        "published" boolean not null default true,
        "created_at" timestamptz not null default now(),
        "updated_at" timestamptz not null default now(),
        "deleted_at" timestamptz null,
        constraint "creator_profile_pkey" primary key ("id")
      );
    `)
    this.addSql(
      `create unique index if not exists "IDX_creator_profile_slug_unique" on "creator_profile" ("slug") where deleted_at is null;`
    )
  }

  async down(): Promise<void> {
    this.addSql(`drop table if exists "creator_profile" cascade;`)
  }
}
