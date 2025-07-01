import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  UuidType,
  DateTimeType,
  BooleanType,
  Enum,
} from '@mikro-orm/core';
import { generateUUID } from '@lib/utils';
import { User } from './user.entity';
import { UserSession } from './user_session.entity';

export enum StreamStatus {
  SCHEDULED = 'scheduled',
  LIVE = 'live',
  ENDED = 'ended',
  CANCELLED = 'cancelled',
}

interface StreamSessionCreate {
  user_id: string;
  session_id: string;
  title: string;
  platforms: Record<string, string>;
  status?: StreamStatus;
  start_at?: Date;
}

@Entity({ tableName: 'streams_sessions' })
export class StreamSession {
  @PrimaryKey({ type: UuidType })
  id: string = generateUUID();

  @ManyToOne(() => User)
  user!: User;

  @ManyToOne(() => UserSession)
  session!: UserSession;

  @Property({ columnType: 'varchar(255)' })
  title!: string;

  @Property({ columnType: 'jsonb' })
  platforms!: Record<string, string>;

  @Enum(() => StreamStatus)
  status!: StreamStatus;

  @Property({ type: BooleanType })
  is_live: boolean = false;

  @Property({ type: BooleanType })
  completed: boolean = false;

  @Property({ type: BooleanType })
  archived: boolean = false;

  @Property({ type: BooleanType })
  removed: boolean = false;

  @Property({ type: DateTimeType })
  start_at: Date = new Date();

  @Property({ type: DateTimeType, nullable: true })
  end_at?: Date;

  @Property({ type: DateTimeType })
  ctime: Date = new Date();

  @Property({ type: DateTimeType, onUpdate: () => new Date() })
  mtime: Date = new Date();

  @Property({ type: DateTimeType, nullable: true })
  rtime?: Date;

  constructor({
    user_id,
    session_id,
    title,
    platforms,
    status,
    start_at,
  }: StreamSessionCreate) {
    this.user.id = user_id;
    this.session.id = session_id;
    this.title = title;
    this.platforms = platforms;
    this.status = status ?? StreamStatus.LIVE;
    this.start_at = start_at ?? new Date();
  }
}
