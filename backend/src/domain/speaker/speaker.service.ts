import { Injectable } from '@nestjs/common';
import { SpeakerRepository } from './speaker.repository';
import { Speaker } from './speaker.entity';

@Injectable()
export class SpeakerService {
  constructor(private speakerRepository: SpeakerRepository) {}

  public async getByID(id: number): Promise<Speaker> {
    return this.speakerRepository.findOne(id);
  }

  public async getAll(): Promise<Speaker[]> {
    return this.speakerRepository.find();
  }

  public create(speaker: Partial<Speaker>): Promise<Speaker> {
    return this.speakerRepository.create(speaker).save();
  }

  public async update(speaker: Partial<Speaker>): Promise<Speaker> {
    const oldSpeaker = await this.getByID(speaker.id);
    return Object.assign(oldSpeaker, speaker).save();
  }
}
