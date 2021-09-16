import { Injectable, NotFoundException } from '@nestjs/common';

import { Talk } from './talk.entity';
import { TalkRepository } from './talk.repository';

@Injectable()
export class TalkService {
  constructor(private talkRepository: TalkRepository) {}

  public getByID(id: number): Promise<Talk> {
    const talk = this.talkRepository.findOne(id, { relations: ['speakers'] });
    if (!talk) {
      throw new NotFoundException(`Couldn't find talk with id: ${id}`);
    }
    return talk;
  }

  public getAll(): Promise<Talk[]> {
    return this.talkRepository.find({ relations: ['speakers'] });
  }

  public create(talk: Partial<Talk>): Promise<Talk> {
    return this.talkRepository.save(talk);
  }

  public async update(talk: Partial<Talk>): Promise<Talk> {
    const oldTalk = await this.getByID(talk.id);
    return Object.assign(oldTalk, talk).save();
  }
}
