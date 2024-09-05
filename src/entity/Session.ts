import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: 'uuid' })
  user_id: string;

  @Column({ type: 'text', unique: true })
  session_key: string;

  @Column({ type: 'text' })
  user_agent: string;

  @Column({ type: 'text' })
  ip_address: string;

  @Column({ type: 'boolean', default: true })
  is_active: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToOne(() => User, user => user.sessions)
  user: User;
}
