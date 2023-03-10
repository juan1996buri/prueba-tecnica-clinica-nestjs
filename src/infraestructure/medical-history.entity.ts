import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Doctor } from './doctor.entity';
import { Patient } from './patient.entity';

@Entity({ name: 'doctor-patient' })
export class MedicalHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Doctor, {
    eager: true,
    nullable: false,
  })
  doctor: Doctor;

  @ManyToOne(() => Patient, (p) => p.medicalHistory)
  patient: Patient;

  @Column({ nullable: true })
  observations: string;

  @Column({ nullable: true })
  healthStatus: string;
}
