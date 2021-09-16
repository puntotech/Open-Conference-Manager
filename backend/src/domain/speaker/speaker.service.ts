import { Injectable } from '@nestjs/common';
import { Speaker } from './speaker.entity';
import { SpeakerRepository } from './speaker.repository';

@Injectable()
export class SpeakerService {
  constructor(private speakerRepository: SpeakerRepository) {}

  public getByID(id: number): Promise<Speaker> {
    return this.speakerRepository
      .createQueryBuilder('speaker')
      .leftJoinAndSelect('speaker.talks', 'talk')
      .where({ id })
      .andWhere('talk.status=1')
      .getOne();
  }

  public getAll(): Promise<Speaker[]> {
    return this.speakerRepository
      .createQueryBuilder('speaker')
      .leftJoinAndSelect('speaker.talks', 'talk')
      .where('talk.status=1')
      .getMany();
  }

  public create(speaker: Partial<Speaker>): Promise<Speaker> {
    return this.speakerRepository.create(speaker).save();
  }

  public async update(speaker: Partial<Speaker>): Promise<Speaker> {
    const oldSpeaker = await this.getByID(speaker.id);
    return Object.assign(oldSpeaker, speaker).save();
  }
}
