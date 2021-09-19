import {
  MiddlewareConsumer,
  Module,
  NestMiddleware,
  NestModule,
} from '@nestjs/common';

import { AuthMiddleware } from './shared/middleware/auth.middleware';
import { AuthModule } from '@modules/auth/auth.module';
import { NextFunction } from 'express';
import { SpeakerController } from '@modules/speaker/speaker.controller';
import { SpeakerModule } from 'src/domain/speaker/speaker.module';
import { TalkController } from '@modules/talk/talk.controller';
import { TalkModule } from '@modules/talk/talk.module';

@Module({
  imports: [AuthModule, SpeakerModule, TalkModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(SpeakerController, TalkController);
  }
}
