import { FindOneOptions, Not, Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { Speaker } from './speaker.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TalkService } from '@modules/talk/talk.service';
import { Talk } from '@modules/talk/talk.entity';
import { transformTalksToObject } from 'src/shared/utils/utils';

@Injectable()
export class SpeakerService {
  constructor(
    @InjectRepository(Speaker)
    private speakerRepository: Repository<Speaker>,
  ) {}

  public async findByID(id: number): Promise<Speaker & { talks?: Talk }> {
    const speaker: Speaker & { talks?: Talk } =
      await this.speakerRepository.findOne({
        where: { id },
        relations: ['speakerTalkStatus', 'speakerTalkStatus.talk'],
      });

    speaker.talks = transformTalksToObject(
      speaker.speakerTalkStatus.map((status) => status.talk),
    );

    return speaker;
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
