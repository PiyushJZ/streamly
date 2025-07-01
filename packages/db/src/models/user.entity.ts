import {
  Entity,
  PrimaryKey,
  Property,
  UuidType,
  BooleanType,
  DateTimeType,
  Unique,
  Index,
  OneToOne,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { generateUUID } from '@lib/utils';
import { UserProfile } from './user_profile.entity';
import { UserInvite } from './user_invite.entity';
import { UserSession } from './user_session.entity';
import { UserPlatformAccount } from './user_platform_account.entity';
import { PasswordReset } from './password_reset.entity';
import { StreamSession } from './stream_session.entity';

interface UserCreate {
  username: string;
  email: string;
  password: string;
}

@Entity({ tableName: 'users' })
@Unique({ properties: ['username', 'email'] })
@Index({ properties: ['username', 'email'] })
export class User {
  @PrimaryKey({ type: UuidType })
  id: string = generateUUID();

  @OneToOne(() => UserProfile, { mappedBy: 'user', orphanRemoval: true })
  profile?: UserProfile;

  @OneToMany(() => UserInvite, invite => invite.user)
  invite = new Collection<UserInvite>(this);

  @OneToMany(() => UserSession, session => session.user)
  session = new Collection<UserSession>(this);

  @OneToMany(() => UserPlatformAccount, account => account.user)
  account = new Collection<UserPlatformAccount>(this);

  @OneToMany(() => PasswordReset, reset => reset.user)
  reset = new Collection<PasswordReset>(this);

  @OneToMany(() => StreamSession, streamSession => streamSession.user)
  streamSession = new Collection<StreamSession>(this);

  @Property({ columnType: 'varchar(20)' })
  username!: string;

  @Property({ columnType: 'varchar(255)' })
  email!: string;

  @Property({ columnType: 'varchar(100)' })
  password!: string;

  @Property({ type: BooleanType })
  verified: boolean = false;

  @Property({ type: BooleanType })
  removed: boolean = false;

  @Property({ type: DateTimeType, nullable: true })
  verified_at?: Date;

  @Property({ type: DateTimeType })
  ctime: Date = new Date();

  @Property({ type: DateTimeType, onUpdate: () => new Date() })
  mtime: Date = new Date();

  @Property({ type: DateTimeType, nullable: true })
  rtime?: Date;

  constructor({ username, email, password }: UserCreate) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
