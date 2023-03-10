import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { MedicalHistory } from './medical-history.entity';

@Entity({ name: 'patient' })
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  dateOfBirth: Date;

  @ManyToOne(() => User, (user) => user.patient)
  user: User;

  @OneToMany(() => MedicalHistory, (m) => m.patient, { eager: true })
  medicalHistory: MedicalHistory[];
}
