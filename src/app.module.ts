import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { join } from 'path';

import {
  GLOBAL_RESPONSE_INTERCEPTOR,
  GLOBAL_VALIDATION_PIPE,
} from './common/providers';
import { AuthorizationModule } from './common/modules/authorization';

import databaseConfig from './configs/database.config';
import secretConfig from './configs/secret.config';
import adminConfig from './configs/admin.config';

import { UserModule } from './features/user';
import { AuthModule } from './features/auth';
import { TodoModule } from './features/todo';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, secretConfig, adminConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('database.uri'),
      }),
    }),
    AuthorizationModule.register({
      global: true,
      modelPath: join(__dirname, '../casbin/model.conf'),
      policyAdapter: join(__dirname, '../casbin/policy.csv'),
    }),
    UserModule,
    AuthModule,
    TodoModule,
  ],
  providers: [GLOBAL_VALIDATION_PIPE, GLOBAL_RESPONSE_INTERCEPTOR],
})
export class AppModule {}
