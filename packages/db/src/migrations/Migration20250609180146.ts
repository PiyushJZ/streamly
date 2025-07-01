import { Migration } from '@mikro-orm/migrations';

export class Migration20250609180146 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create schema if not exists "dev";`);
    this.addSql(`create table "dev"."platforms" ("id" uuid not null, "platform" varchar(30) not null, "removed" boolean not null default false, "ctime" timestamptz not null, "mtime" timestamptz not null, "rtime" timestamptz null, constraint "platforms_pkey" primary key ("id"));`);
    this.addSql(`alter table "dev"."platforms" add constraint "platforms_platform_unique" unique ("platform");`);

    this.addSql(`create table "dev"."users" ("id" uuid not null, "username" varchar(20) not null, "email" varchar(255) not null, "password" varchar(100) not null, "verified" boolean not null, "removed" boolean not null, "verified_at" timestamptz null, "ctime" timestamptz not null, "mtime" timestamptz not null, "rtime" timestamptz null, constraint "users_pkey" primary key ("id"));`);
    this.addSql(`create index "users_username_email_index" on "dev"."users" ("username", "email");`);
    this.addSql(`alter table "dev"."users" add constraint "users_username_email_unique" unique ("username", "email");`);

    this.addSql(`create table "dev"."password_resets" ("id" uuid not null, "user_id" uuid not null, "token" text not null, "token_used" boolean not null, "removed" boolean not null, "expires_at" timestamptz not null, "ctime" timestamptz not null, "mtime" timestamptz not null, "rtime" timestamptz not null, constraint "password_resets_pkey" primary key ("id"));`);

    this.addSql(`create table "dev"."user_invites" ("id" uuid not null, "user_id" uuid not null, "email" varchar(255) not null, "token" text not null, "removed" boolean not null, "expires_at" timestamptz not null, "ctime" timestamptz not null, "mtime" timestamptz not null, "rtime" timestamptz null, constraint "user_invites_pkey" primary key ("id"));`);

    this.addSql(`create table "dev"."user_platform_accounts" ("id" uuid not null, "user_id" uuid not null, "platform_id" uuid not null, "access_token" text not null, "refresh_token" text not null, "platform_user_id" text not null, "platform_username" varchar(50) not null, "removed" boolean not null, "expires_at" timestamptz not null, "ctime" timestamptz not null, "mtime" timestamptz not null, "rtime" timestamptz null, constraint "user_platform_accounts_pkey" primary key ("id"));`);

    this.addSql(`create table "dev"."user_profiles" ("id" uuid not null, "user_id" uuid not null, "name" varchar(30) null, "phone" varchar(15) null, "country" varchar(50) null, "city" varchar(50) null, "age" int null, "removed" boolean not null, "ctime" timestamptz not null, "mtime" timestamptz not null, "rtime" timestamptz null, constraint "user_profiles_pkey" primary key ("id"));`);
    this.addSql(`alter table "dev"."user_profiles" add constraint "user_profiles_user_id_unique" unique ("user_id");`);

    this.addSql(`create table "dev"."user_sessions" ("id" uuid not null, "user_id" uuid not null, "token" text not null, "ipaddress" inet not null, "user_agent" text not null, "location" text not null, "removed" boolean not null, "expires_at" timestamptz not null, "last_used_at" timestamptz not null, "ctime" timestamptz not null, "mtime" timestamptz not null, "rtime" timestamptz null, constraint "user_sessions_pkey" primary key ("id"));`);
    this.addSql(`alter table "dev"."user_sessions" add constraint "user_sessions_token_unique" unique ("token");`);

    this.addSql(`create table "dev"."streams_sessions" ("id" uuid not null, "user_id" uuid not null, "session_id" uuid not null, "title" varchar(255) not null, "platforms" jsonb not null, "status" text check ("status" in ('scheduled', 'live', 'ended', 'cancelled')) not null, "is_live" boolean not null, "completed" boolean not null, "archived" boolean not null, "removed" boolean not null, "start_at" timestamptz not null, "end_at" timestamptz null, "ctime" timestamptz not null, "mtime" timestamptz not null, "rtime" timestamptz null, constraint "streams_sessions_pkey" primary key ("id"));`);

    this.addSql(`alter table "dev"."password_resets" add constraint "password_resets_user_id_foreign" foreign key ("user_id") references "dev"."users" ("id") on update cascade;`);

    this.addSql(`alter table "dev"."user_invites" add constraint "user_invites_user_id_foreign" foreign key ("user_id") references "dev"."users" ("id") on update cascade;`);

    this.addSql(`alter table "dev"."user_platform_accounts" add constraint "user_platform_accounts_user_id_foreign" foreign key ("user_id") references "dev"."users" ("id") on update cascade;`);
    this.addSql(`alter table "dev"."user_platform_accounts" add constraint "user_platform_accounts_platform_id_foreign" foreign key ("platform_id") references "dev"."platforms" ("id") on update cascade;`);

    this.addSql(`alter table "dev"."user_profiles" add constraint "user_profiles_user_id_foreign" foreign key ("user_id") references "dev"."users" ("id") on update cascade;`);

    this.addSql(`alter table "dev"."user_sessions" add constraint "user_sessions_user_id_foreign" foreign key ("user_id") references "dev"."users" ("id") on update cascade;`);

    this.addSql(`alter table "dev"."streams_sessions" add constraint "streams_sessions_user_id_foreign" foreign key ("user_id") references "dev"."users" ("id") on update cascade;`);
    this.addSql(`alter table "dev"."streams_sessions" add constraint "streams_sessions_session_id_foreign" foreign key ("session_id") references "dev"."user_sessions" ("id") on update cascade;`);
  }

}
