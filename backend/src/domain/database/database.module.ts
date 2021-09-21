import { Global, Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { LoggerOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Speaker } from '../speaker/speaker.entity';
import { SpeakerTalkStatus } from '@modules/speaker/speaker-talk-status.entity';
import { Talk } from '@modules/talk/talk.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

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
      logging: configService.get<LoggerOptions>('DB_LOGGING'),
      dropSchema: false,
      synchronize: true,
      entities: [Speaker, Talk, SpeakerTalkStatus],
      extra: {
        multipleStatements: true,
        connectionLimit: 100,
      },
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
