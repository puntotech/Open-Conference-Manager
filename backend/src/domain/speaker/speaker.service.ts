import { Injectable } from '@nestjs/common';
import { Speaker } from './speaker.entity';
import { SpeakerRepository } from './speaker.repository';
import { FindManyOptions, FindOneOptions } from 'typeorm';

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

  public find(options?: FindManyOptions<Speaker>): Promise<Speaker[]> {
    return this.speakerRepository.find(options);
  }

  public findOne(options?: FindOneOptions<Speaker>): Promise<Speaker> {
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

  public async upsert(speaker: Partial<Speaker>) {
    const oldSpeaker = await this.speakerRepository.findOne({
      email: speaker.email,
    });
    if (oldSpeaker) {
      return Object.assign(oldSpeaker, speaker).save();
    }
    return this.create(speaker);
  }
}
