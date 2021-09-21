import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';

import { Speaker } from './speaker.entity';
import { Talk } from '@modules/talk/talk.entity';

@Entity()
export class SpeakerTalkStatus extends BaseEntity {
  @Column({ nullable: false, primary: true })
  speakerId: number;

  @ManyToOne(() => Speaker, (speaker) => speaker.speakerTalkStatus)
  speaker: Speaker;

  @Column({ nullable: false, primary: true })
  talkId: number;

  @ManyToOne(() => Talk, (talk) => talk.speakerTalkStatus)
  talk: Talk;

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1,
  })
  admin: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    nullable: false,
    precision: 6,
  })
  createdAt: Date;
}
