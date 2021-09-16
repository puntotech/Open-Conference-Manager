import { AuthModule } from '@modules/auth/auth.module';
import { Module } from '@nestjs/common';
import { SpeakerModule } from 'src/domain/speaker/speaker.module';
import { TalkModule } from '@modules/talk/talk.module';

@Module({
  imports: [SpeakerModule, AuthModule, TalkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
