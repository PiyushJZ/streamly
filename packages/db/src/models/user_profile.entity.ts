import {
  Entity,
  PrimaryKey,
  Property,
  UuidType,
  BooleanType,
  DateTimeType,
  OneToOne,
  IntegerType,
} from '@mikro-orm/core';
import { generateUUID } from '@lib/utils';
import { User } from './user.entity';

interface UserProfileCreate {
  user_id: string;
  name?: string;
  phone?: string;
  country?: string;
  city?: string;
  age?: number;
}

@Entity({ tableName: 'user_profiles' })
export class UserProfile {
  @PrimaryKey({ type: UuidType })
  id: string = generateUUID();

  @OneToOne(() => User, { owner: true })
  user!: User;

  @Property({ columnType: 'varchar(30)', nullable: true })
  name?: string;

  @Property({ columnType: 'varchar(15)', nullable: true })
  phone?: string;

  @Property({ columnType: 'varchar(50)', nullable: true })
  country?: string;

  @Property({ columnType: 'varchar(50)', nullable: true })
  city?: string;

  @Property({ type: IntegerType, nullable: true })
  age?: number;

  @Property({ type: BooleanType })
  removed?: boolean = false;

  @Property({ type: DateTimeType })
  ctime?: Date = new Date();

  @Property({ type: DateTimeType, onUpdate: () => new Date() })
  mtime?: Date = new Date();

  @Property({ type: DateTimeType, nullable: true })
  rtime?: Date;

  constructor({ user_id, name, phone, country, city, age }: UserProfileCreate) {
    this.user.id = user_id;
    this.name = name;
    this.phone = phone;
    this.country = country;
    this.city = city;
    this.age = age;
  }
}
