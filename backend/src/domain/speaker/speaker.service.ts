import { FindOneOptions, Not, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { Speaker } from './speaker.entity';
import { InjectRepository } from '@nestjs/typeorm';

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

  public findOne(options?: FindOneOptions<Speaker>): Promise<Speaker> {
    return this.speakerRepository.findOne(options);
  }

  public findAll(speaker: Speaker): Promise<Speaker[]> {
    return this.speakerRepository.find({
      where: { id: Not(speaker.id) },
    });
  }

  public create(speaker: Partial<Speaker>): Promise<Speaker> {
    return this.speakerRepository.create(speaker).save();
  }

  public update(speaker: Partial<Speaker>): Promise<Speaker> {
    return this.speakerRepository.save(speaker);
  }
}
