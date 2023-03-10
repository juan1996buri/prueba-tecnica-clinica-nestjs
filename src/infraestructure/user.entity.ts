import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';
import { Patient } from './patient.entity';
import { Hospital } from './hospital.entity';
import { Doctor } from './doctor.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ type: 'uuid', nullable: true, unique: true })
  otpSecret: string;

  @Column({ default: false, nullable: true })
  status: Boolean;

  @OneToMany(() => Patient, (patient) => patient.user)
  patient: Patient[];

  @OneToMany(() => Hospital, (hospital) => hospital.user)
  hospital: Hospital[];

  @OneToMany(() => Doctor, (doctor) => doctor.user)
  doctor: Doctor[];
}
