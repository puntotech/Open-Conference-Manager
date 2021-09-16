import { Injectable } from '@nestjs/common';
import { Speaker } from './speaker.entity';
import { SpeakerRepository } from './speaker.repository';

@Injectable()
export class SpeakerService {
  constructor(private speakerRepository: SpeakerRepository) {}

  public findByID(id: number): Promise<Speaker> {
    return this.speakerRepository
      .createQueryBuilder('speaker')
      .leftJoinAndSelect('speaker.talks', 'talk')
      .where({ id })
      .andWhere('talk.status=1')
      .getOne();
  }
  public find(options): Promise<Speaker[]> {
    return this.speakerRepository.find(options);
  }
  public findOne(options): Promise<Speaker> {
    return this.speakerRepository.findOne(options);
  }

  public findAll(): Promise<Speaker[]> {
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
    const oldSpeaker = await this.findByID(speaker.id);
    return Object.assign(oldSpeaker, speaker).save();
  }
}
