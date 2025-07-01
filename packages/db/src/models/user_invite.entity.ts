import {
  Entity,
  PrimaryKey,
  Property,
  UuidType,
  BooleanType,
  DateTimeType,
  ManyToOne,
} from '@mikro-orm/core';
import { generateUUID, getTimeAfterHours } from '@lib/utils';
import { User } from './user.entity';

interface UserInviteCreate {
  user_id: string;
  email: string;
  token: string;
}

@Entity({ tableName: 'user_invites' })
export class UserInvite {
  @PrimaryKey({ type: UuidType })
  id: string = generateUUID();

  @ManyToOne(() => User)
  user!: User;

  @Property({ columnType: 'varchar(255)' })
  email!: string;

  @Property({ columnType: 'text' })
  token!: string;

  @Property({ type: BooleanType })
  removed?: boolean = false;

  @Property({ type: DateTimeType })
  expires_at?: Date = getTimeAfterHours();

  @Property({ type: DateTimeType })
  ctime?: Date = new Date();

  @Property({ type: DateTimeType, onUpdate: () => new Date() })
  mtime?: Date = new Date();

  @Property({ type: DateTimeType, nullable: true })
  rtime?: Date;

  constructor({ user_id, email, token }: UserInviteCreate) {
    this.user.id = user_id;
    this.email = email;
    this.token = token;
  }
}
