import { Injectable, NotFoundException } from '@nestjs/common';

import { Talk } from './talk.entity';
import { TalkRepository } from './talk.repository';
import { Speaker } from '@modules/speaker/speaker.entity';

@Injectable()
export class TalkService {
  constructor(private talkRepository: TalkRepository) {}

  public async getByID(id: number): Promise<Talk> {
    const talk = await this.talkRepository.findOne({
      relations: ['speakers'],
      where: { status: true, id },
    });
    if (!talk) {
      throw new NotFoundException(`Couldn't find talk with id: ${id}`);
    }
    return talk;
  }

  public async getBySpeakerId(id: number): Promise<Talk[]> {
    return this.talkRepository
      .createQueryBuilder('talk')
      .leftJoinAndSelect('talk.speakers', 'speaker')
      .where('speaker.id=:id', { id })
      .andWhere('talk.status=1')
      .getMany();
  }

  public getAll(): Promise<Talk[]> {
    return this.talkRepository.find({
      relations: ['speakers'],
      where: { status: true },
    });
  }

  public create(talk: Partial<Talk>, speaker: Speaker): Promise<Talk> {
    return this.talkRepository.save({ ...talk, speakers: [speaker] });
  }

  public async update(talk: Partial<Talk>): Promise<Talk> {
    const oldTalk = await this.getByID(talk.id);
    return Object.assign(oldTalk, talk).save();
  }
}
