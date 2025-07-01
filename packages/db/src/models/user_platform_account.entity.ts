import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  UuidType,
  DateTimeType,
  BooleanType,
} from '@mikro-orm/core';
import { generateUUID } from '@lib/utils';
import { User } from './user.entity';
import { Platform } from './platform.entity';

interface UserPlatformAccountCreate {
  user_id: string;
  platform_id: string;
  access_token: string;
  refresh_token: string;
  platform_user_id: string;
  platform_username: string;
  expires_at: Date;
}

@Entity({ tableName: 'user_platform_accounts' })
export class UserPlatformAccount {
  @PrimaryKey({ type: UuidType })
  id: string = generateUUID();

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => Platform)
  platform!: Platform;

  @Property({ columnType: 'text' })
  access_token!: string;

  @Property({ columnType: 'text' })
  refresh_token!: string;

  @Property({ columnType: 'text' })
  platform_user_id!: string;

  @Property({ columnType: 'varchar(50)' })
  platform_username!: string;

  @Property({ type: BooleanType })
  removed?: boolean = false;

  @Property({ type: DateTimeType })
  expires_at!: Date;

  @Property({ type: DateTimeType })
  ctime?: Date = new Date();

  @Property({ type: DateTimeType, onUpdate: () => new Date() })
  mtime?: Date = new Date();

  @Property({ type: DateTimeType, nullable: true })
  rtime?: Date;

  constructor({
    user_id,
    platform_id,
    access_token,
    refresh_token,
    platform_user_id,
    platform_username,
    expires_at,
  }: UserPlatformAccountCreate) {
    this.user.id = user_id;
    this.platform.id = platform_id;
    this.access_token = access_token;
    this.refresh_token = refresh_token;
    this.platform_user_id = platform_user_id;
    this.platform_username = platform_username;
    this.expires_at = expires_at;
  }
}
