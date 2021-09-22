import { BaseEntity, Column, Entity, ManyToOne } from 'typeorm';

import { Talk } from '@modules/talk/talk.entity';
import { Speaker } from '@modules/speaker/speaker.entity';

@Entity()
export class SpeakerTalkStatus extends BaseEntity {
  @Column({ nullable: false, primary: true })
  speakerId: number;

  @ManyToOne(() => Speaker, (speaker) => speaker.speakerTalkStatus, {
    onDelete: 'CASCADE',
  })
  speaker: Speaker;

  @Column({ nullable: false, primary: true })
  talkId: number;

  @ManyToOne(() => Talk, (talk) => talk.speakerTalkStatus, {
    onDelete: 'CASCADE',
  })
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
