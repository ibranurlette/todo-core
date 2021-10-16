import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdminUser } from './users.entity';

@Entity({ schema: 'admin', name: 'refresh_token' })
export class AdminRefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ManyToOne(() => AdminUser, (adminUser) => adminUser.refresh_tokens)
  @JoinColumn({ name: 'user_id' })
  user: AdminUser;
  @Column({ type: 'uuid', nullable: false })
  user_id: string;

  @Column({ type: 'varchar', nullable: false })
  token: string;

  @Column({ type: 'timestamp without time zone', nullable: false })
  expired_at: Date;

  @Column({ type: 'varchar', length: 50, nullable: false, default: '' })
  ip_address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
