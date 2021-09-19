import { Global, Module } from '@nestjs/common';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Speaker } from '../speaker/speaker.entity';
import { Talk } from '@modules/talk/talk.entity';
import { createConnection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

/* const providersExported = [
  {
    provide: DB_CONNECTION_TOKEN,
    useFactory: async (configService: ConfigService) => ({
      type: configService.get('DB_TYPE'),
      host: configService.get('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASS'),
      database: configService.get('DB_DATABASE'),
    }),
    inject: [ConfigService, DB_CONFIGURATION_TOKEN],
  },
]; */

const databaseConnection = [
  TypeOrmModule.forRootAsync({
    useFactory: async (configService: ConfigService) => ({
      type: 'mysql',
      namingStrategy: new SnakeNamingStrategy(),
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USER'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      entities: [Speaker, Talk],
    }),
    inject: [ConfigService],
  }),
];
@Global()
@Module({
  imports: [...databaseConnection],
  exports: [...databaseConnection],
})
export class DatabaseModule {}
