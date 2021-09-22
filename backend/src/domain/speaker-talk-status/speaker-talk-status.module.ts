import { Speaker } from '@modules/speaker/speaker.entity';
import { Talk } from '@modules/talk/talk.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeakerTalkStatusController } from './speaker-talk-status.controller';
import { SpeakerTalkStatus } from './speaker-talk-status.entity';
import { SpeakerTalkStatusService } from './speaker-talk-status.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpeakerTalkStatus, Talk, Speaker])],
  controllers: [SpeakerTalkStatusController],
  providers: [SpeakerTalkStatusService],
  exports: [SpeakerTalkStatusService],
})
export class SpeakerTalkStatusModule {}
