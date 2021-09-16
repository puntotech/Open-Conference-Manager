import {
  BaseEntity,
  Column,
  Entity,
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

  @ManyToMany(() => Talk)
  talks: Talk[];
}
