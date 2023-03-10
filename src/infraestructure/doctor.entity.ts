import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Hospital } from './hospital.entity';
import { MedicalHistory } from './medical-history.entity';

@Entity({ name: 'doctor' })
export class Doctor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  address: string;

  @Column({ nullable: false })
  specialty: string;

  @ManyToOne(() => User, (user) => user.doctor, { eager: true })
  user: User;

  @ManyToOne(() => Hospital, (user) => user.doctor, { eager: true })
  hospital: Hospital;

  @OneToMany(() => MedicalHistory, (m) => m.doctor)
  medicalHistory: MedicalHistory[];
}
