import { Entity, PrimaryGeneratedColumn, Column,OneToMany, CreateDateColumn } from 'typeorm';
import { userInterface } from '../interface/User';
import { Session } from './Session';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'text', unique: true})
  username: string;

  @Column({type: 'text', unique: true})
  mobile_number: string;
  
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;
 
  @OneToMany(() => Session, session => session.user)
    sessions: Session[];

  public static mockTestBoard(): userInterface {
    const user: User = new User();
    user.username = 'vader1998';
    user.mobile_number = '7776665552';
    return user;
  }
}
