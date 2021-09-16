import { Injectable } from '@nestjs/common';
import { Speaker } from './speaker.entity';
import { SpeakerRepository } from './speaker.repository';

@Injectable()
export class SpeakerService {
  constructor(private speakerRepository: SpeakerRepository) {}

  public findByID(id: number): Promise<Speaker> {
    return this.speakerRepository.findOne(id);
  }
  public find(options): Promise<Speaker[]> {
    return this.speakerRepository.find(options);
  }
  public findOne(options): Promise<Speaker> {
    return this.speakerRepository.findOne(options);
  }

  public findAll(): Promise<Speaker[]> {
    return this.speakerRepository.find();
  }

  public create(speaker: Partial<Speaker>): Promise<Speaker> {
    return this.speakerRepository.create(speaker).save();
  }

  public async update(speaker: Partial<Speaker>): Promise<Speaker> {
    const oldSpeaker = await this.findByID(speaker.id);
    return Object.assign(oldSpeaker, speaker).save();
  }
}
