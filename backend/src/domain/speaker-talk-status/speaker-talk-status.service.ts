import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpeakerTalkStatus } from './speaker-talk-status.entity';
import { Talk } from '@modules/talk/talk.entity';
import { Speaker } from '@modules/speaker/speaker.entity';

@Injectable()
export class SpeakerTalkStatusService {
  constructor(
    @InjectRepository(SpeakerTalkStatus)
    private speakerTalkStatusRepository: Repository<SpeakerTalkStatus>,
    @InjectRepository(Talk)
    private talkRepository: Repository<Talk>,
    @InjectRepository(Speaker)
    private speakerRepository: Repository<Speaker>,
  ) {}

  public async addCospeaker(
    speakerTalkStatus: Partial<SpeakerTalkStatus>,
  ): Promise<SpeakerTalkStatus> {
    const [speaker, talk] = await Promise.all([
      this.speakerRepository.findOne(speakerTalkStatus.speakerId),
      this.talkRepository.findOne(speakerTalkStatus.talkId),
    ]);
    if (!speaker || !talk) {
      throw new NotFoundException(
        `There is no speaker or talk with thats ids: speaker:${speakerTalkStatus.speakerId}-talk:${speakerTalkStatus.talkId}`,
      );
    }

    return this.speakerTalkStatusRepository
      .create({ ...speakerTalkStatus, admin: false })
      .save();
  }

  public async removeCospeaker(
    speakerTalkStatus: Partial<SpeakerTalkStatus>,
  ): Promise<SpeakerTalkStatus> {
    const status = await this.speakerTalkStatusRepository.findOne(
      speakerTalkStatus,
    );
    if (!status || status.admin) {
      throw new NotFoundException(
        `There is no status with thats ids: speaker:${speakerTalkStatus.speakerId}-talk:${speakerTalkStatus.talkId}`,
      );
    }
    return this.speakerTalkStatusRepository.remove(status);
  }
}
