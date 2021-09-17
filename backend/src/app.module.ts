import { Module } from '@nestjs/common';

import { AuthModule } from '@modules/auth/auth.module';
import { SpeakerModule } from 'src/domain/speaker/speaker.module';
import { TalkModule } from '@modules/talk/talk.module';

@Module({
  imports: [AuthModule, SpeakerModule, TalkModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
