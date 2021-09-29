import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@modules/database/database.module';
import { Module } from '@nestjs/common';
import { SpeakerModule } from 'src/domain/speaker/speaker.module';
import { SpeakerTalkStatusModule } from '@modules/speaker-talk-status/speaker-talk-status.module';
import { TalkModule } from '@modules/talk/talk.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      /* load: [configuration], */
    }),
    DatabaseModule,
    AuthModule,
    SpeakerModule,
    TalkModule,
    SpeakerTalkStatusModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
