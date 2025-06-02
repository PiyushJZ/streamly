import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NatsClientModule } from '@/nats-client/nats-client.module';
import { validateEnv, configuration } from '@/config';
import { GrpcClientModule } from './grpc-client/grpc-client.module';
import { AuthServiceModule } from './auth-service/auth-service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validateEnv,
      cache: true,
    }),
    NatsClientModule,
    GrpcClientModule,
    AuthServiceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
