import { Module, Global } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import dbConfig from './mikro-orm.config';

@Global()
@Module({
  imports: [MikroOrmModule.forRoot(dbConfig)],
  exports: [MikroOrmModule],
})
export class DBModule {}
