import {
  Entity,
  PrimaryKey,
  Property,
  UuidType,
  BooleanType,
  DateTimeType,
  Unique,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { generateUUID } from '@lib/utils';
import { UserPlatformAccount } from './user_platform_account.entity';

@Entity({ tableName: 'platforms' })
@Unique({ properties: ['platform'] })
export class Platform {
  @PrimaryKey({ type: UuidType })
  id: string = generateUUID();

  @OneToMany(() => UserPlatformAccount, account => account.platform)
  account = new Collection<UserPlatformAccount>(this);

  @Property({ columnType: 'varchar(30)' })
  platform!: string;

  @Property({ type: BooleanType })
  removed: boolean = false;

  @Property({ type: DateTimeType })
  ctime: Date = new Date();

  @Property({ type: DateTimeType, onUpdate: () => new Date() })
  mtime: Date = new Date();

  @Property({ type: DateTimeType, nullable: true })
  rtime?: Date;

  constructor(platform: string) {
    this.platform = platform;
  }
}
