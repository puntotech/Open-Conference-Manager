import { Injectable, NotFoundException } from '@nestjs/common';

import { Talk } from './talk.entity';
import { TalkRepository } from './talk.repository';

@Injectable()
export class TalkService {
  constructor(private talkRepository: TalkRepository) {}

  getBySpeaker(speakerId: string): Promise<Talk[]> {
    return this.talkRepository
      .createQueryBuilder('talk')
      .innerJoin('talk.speakers', 'speaker')
      .where('speaker.id = :id', { id: speakerId })
      .getMany();
  }

  public getByID(id: number): Promise<Talk> {
    const talk = this.talkRepository.findOne(id);
    if (!talk) {
      throw new NotFoundException(`Couldn't find talk with id: ${id}`);
    }
    return talk;
  }

  public getAll(): Promise<Talk[]> {
    return this.talkRepository.find();
  }

  public create(talk: Partial<Talk>): Promise<Talk> {
    return this.talkRepository.create(talk).save();
  }

  public async update(talk: Partial<Talk>): Promise<Talk> {
    const oldTalk = await this.getByID(talk.id);
    return Object.assign(oldTalk, talk).save();
  }
}
