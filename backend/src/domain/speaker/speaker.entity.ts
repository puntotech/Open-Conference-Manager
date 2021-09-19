import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import { Talk } from '@modules/talk/talk.entity';

@Entity()
@Unique(['email'])
export class Speaker extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  password: string;

  @Column({
    type: 'varchar',
    nullable: false,
    default: '',
  })
  name: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  photoUrl: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  bio: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  twitter: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  github: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  linkedin: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  youtube: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  company: string;

  @Column({
    type: 'varchar',
    default: '',
  })
  locale: string;

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

  @ManyToMany(() => Talk, (talk) => talk.speakers)
  @JoinTable({
    name: 'speakers_talks',
  })
  talks: Talk[];
}
