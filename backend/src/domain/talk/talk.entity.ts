import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Speaker } from '@modules/speaker/speaker.entity';

@Entity()
export class Talk extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  tittle: string;

  @Column({
    type: 'varchar',
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
  level: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  comments: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  submitted?: string;

  @ManyToMany(() => Speaker)
  @JoinTable({
    name: 'speakers_talks',
  })
  speakers: Speaker[];

  @Column({
    type: 'tinyint',
    width: 1,
    default: 1,
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
}
