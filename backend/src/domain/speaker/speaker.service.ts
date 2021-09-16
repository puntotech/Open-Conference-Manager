import { Injectable } from '@nestjs/common';
import { Speaker } from './speaker.entity';
import { SpeakerRepository } from './speaker.repository';

@Injectable()
export class SpeakerService {
  constructor(private speakerRepository: SpeakerRepository) {}

  public getByID(id: number): Promise<Speaker> {
    return this.speakerRepository.findOne(id, { relations: ['talks'] });
  }

  public getAll(): Promise<Speaker[]> {
    return this.speakerRepository.find({ relations: ['talks'] });
  }

  public create(speaker: Partial<Speaker>): Promise<Speaker> {
    return this.speakerRepository.create(speaker).save();
  }

  public async update(speaker: Partial<Speaker>): Promise<Speaker> {
    const oldSpeaker = await this.getByID(speaker.id);
    return Object.assign(oldSpeaker, speaker).save();
  }
}
