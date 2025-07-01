import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  UuidType,
  DateTimeType,
  BooleanType,
} from '@mikro-orm/core';
import { generateUUID, getTimeAfterHours } from '@lib/utils';
import { User } from './user.entity';

interface PasswordResetCreate {
  user_id: string;
  token: string;
}

@Entity({ tableName: 'password_resets' })
export class PasswordReset {
  @PrimaryKey({ type: UuidType })
  id: string = generateUUID();

  @ManyToOne(() => User)
  user!: User;

  @Property({ columnType: 'text' })
  token!: string;

  @Property({ type: BooleanType })
  token_used: boolean = false;

  @Property({ type: BooleanType })
  removed: boolean = false;

  @Property({ type: DateTimeType })
  expires_at: Date = getTimeAfterHours();

  @Property({ type: DateTimeType })
  ctime: Date = new Date();

  @Property({ type: DateTimeType })
  mtime: Date = new Date();

  @Property({ type: DateTimeType })
  rtime?: Date;

  constructor({ user_id, token }: PasswordResetCreate) {
    this.user.id = user_id;
    this.token = token;
  }
}
