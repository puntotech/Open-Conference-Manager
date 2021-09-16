import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AuthMiddleware } from './shared/middleware/auth.middleware';
import { AuthModule } from '@modules/auth/auth.module';
import { SpeakerModule } from 'src/domain/speaker/speaker.module';
import { TalkModule } from '@modules/talk/talk.module';

@Module({
  imports: [SpeakerModule, AuthModule, TalkModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('talks', 'speakers');
  }
}
