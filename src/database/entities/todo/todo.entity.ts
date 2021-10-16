import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity({ schema: 'todo', name: 'todo' })
export class Todo extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({ type: 'boolean', default: false })
  is_done: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: 'timestamp without time zone',
    nullable: true,
  })
  deleted_at: Date;

  @BeforeInsert()
  async genUuid() {
    this.id = uuidV4();
  }
}
