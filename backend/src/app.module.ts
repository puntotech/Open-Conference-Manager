import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthMiddleware } from './shared/middleware/auth.middleware';
import { AuthModule } from '@modules/auth/auth.module';
import { SpeakerController } from '@modules/speaker/speaker.controller';
import { SpeakerModule } from 'src/domain/speaker/speaker.module';
import { TalkController } from '@modules/talk/talk.controller';
import { TalkModule } from '@modules/talk/talk.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@modules/database/database.module';
import { Speaker } from '@modules/speaker/speaker.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      /* load: [configuration], */
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Speaker]),
    AuthModule,
    SpeakerModule,
    TalkModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(SpeakerController, TalkController);
  }
}
