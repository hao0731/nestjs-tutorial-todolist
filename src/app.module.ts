import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import {
  GLOBAL_RESPONSE_INTERCEPTOR,
  GLOBAL_VALIDATION_PIPE,
} from './common/providers';

import databaseConfig from './configs/database.config';
import secretConfig from './configs/secret.config';
import adminConfig from './configs/admin.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './features/user/user.module';

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
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, GLOBAL_VALIDATION_PIPE, GLOBAL_RESPONSE_INTERCEPTOR],
})
export class AppModule {}
