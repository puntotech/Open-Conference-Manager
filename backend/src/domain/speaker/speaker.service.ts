import { FindManyOptions, FindOneOptions, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { Speaker } from './speaker.entity';
import { InjectRepository } from '@nestjs/typeorm';

/* private speakerRepository: SpeakerRepository */
@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(Speaker)
    private speakerRepository: Repository<Speaker>,
  ) {}

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

  public update(speaker: Partial<Speaker>): Promise<Speaker> {
    return this.speakerRepository.save(speaker);
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
