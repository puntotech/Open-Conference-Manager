import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { Speaker } from './speaker.entity';

@EntityRepository(Speaker)
export class SpeakerRepository extends BaseRepository<Speaker> {}
