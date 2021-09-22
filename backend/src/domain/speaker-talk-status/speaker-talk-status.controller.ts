import { Controller, Post, Body, UseGuards, Delete } from '@nestjs/common';
import { SpeakerTalkStatusService } from './speaker-talk-status.service';
import { AuthGuard } from '@guards/auth.guard';
import { SpeakerTalkStatus } from './speaker-talk-status.entity';

@Controller('cospeaker')
@UseGuards(AuthGuard)
export class SpeakerTalkStatusController {
  constructor(
    private readonly speakerTalkStatusService: SpeakerTalkStatusService,
  ) {}

  @Post()
  addCospeakers(
    @Body() speakerTalkStatus: Partial<SpeakerTalkStatus>,
  ): Promise<SpeakerTalkStatus> {
    return this.speakerTalkStatusService.addCospeaker(speakerTalkStatus);
  }

  @Delete()
  removeCospeakers(
    @Body() speakerTalkStatus: Partial<SpeakerTalkStatus>,
  ): Promise<SpeakerTalkStatus> {
    return this.speakerTalkStatusService.removeCospeaker(speakerTalkStatus);
  }
}
