import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import Config from '@lib/config';

const config: MikroOrmModuleOptions = {
  driver: PostgreSqlDriver,
  dbName: Config.DB_NAME_AUTH,
  user: Config.DB_USER,
  password: Config.DB_PASS,
  host: Config.DB_HOST,
  port: Config.DB_PORT,
  schema: Config.DB_SCHEMA,
  clientUrl: Config.DB_URL,
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  loadStrategy: 'joined',
  debug: Config.NODE_ENV === 'dev',
  extensions: [Migrator, SeedManager],
  migrations: {
    path: './dist/migrations',
    pathTs: './src/migrations',
    glob: '!(*.d).{ts,js}',
    snapshot: true,
    tableName: 'MIGRATIONS',
    transactional: true,
    allOrNothing: true,
  },
  seeder: {
    path: './dist/seeders',
    pathTs: './src/seeders',
    defaultSeeder: 'PlatformSeeder',
    emit: 'ts',
    fileName: (className: string) => className,
  },
};

export default config;
