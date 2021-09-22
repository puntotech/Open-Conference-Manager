import { Injectable, NotFoundException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { Speaker } from '@modules/speaker/speaker.entity';
import { Talk } from './talk.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TalkService {
  constructor(
    @InjectRepository(Talk)
    private talkRepository: Repository<Talk>,
  ) {}

  public async getByID(id: number): Promise<Talk> {
    const talk = await this.talkRepository.findOne({
      relations: ['speakerTalkStatus', 'speakerTalkStatus.speaker'],
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
      .leftJoinAndSelect('talk.speakerTalkStatus', 'status')
      .where('status.speakerId=:id', { id })
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
    return this.talkRepository.save({
      ...talk,
      speakerTalkStatus: [{ admin: true, speakerId: speaker.id }],
    });
  }

  public async update(talk: Partial<Talk> & { id: number }): Promise<Talk> {
    const oldtalk = await this.talkRepository.findOne(talk.id);

    if (!oldtalk) {
      throw new NotFoundException(`There is no talk with id:${talk.id}`);
    }

    delete talk.speakerTalkStatus;
    const updatedTalk = {
      ...oldtalk,
      ...talk,
      id: talk.id,
    };
    return this.talkRepository.save(updatedTalk);
  }
}
