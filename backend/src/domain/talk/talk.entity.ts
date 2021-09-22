import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { SpeakerTalkStatus } from '@modules/speaker-talk-status/speaker-talk-status.entity';

@Entity()
export class Talk extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'longtext',
    nullable: false,
  })
  abstract: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  language: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  track: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  level: string;

  @Column({
    type: 'longtext',
    nullable: false,
  })
  comments: string;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  submitted?: Date;

  @Column({
    type: 'boolean',
    default: true,
  })
  status: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    nullable: false,
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
    nullable: false,
  })
  updatedAt: Date;

  @OneToMany(
    () => SpeakerTalkStatus,
    (speakerTalkStatus) => speakerTalkStatus.talk,
    { cascade: ['insert'] },
  )
  speakerTalkStatus: SpeakerTalkStatus[];
}
