import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { AdminRefreshToken } from './refresh-token.entity';
import { v4 as uuidV4 } from 'uuid';

@Entity({ schema: 'admin', name: 'user' })
export class AdminUser extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  username: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @Column({ type: 'varchar', nullable: true })
  token: string;

  @Column({
    type: 'timestamp without time zone',
    nullable: true,
  })
  token_expired: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: 'timestamp without time zone',
    nullable: true,
  })
  deleted_at: Date;

  @OneToMany(
    () => AdminRefreshToken,
    (adminRefreshToken) => adminRefreshToken.user,
  )
  refresh_tokens: AdminRefreshToken[];

  @BeforeInsert()
  async genUuid() {
    this.id = uuidV4();
  }
}
