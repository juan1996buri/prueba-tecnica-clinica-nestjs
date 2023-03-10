import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Doctor } from './doctor.entity';

@Entity({ name: 'hospital' })
export class Hospital {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  services: string;

  @ManyToOne(() => User, (user) => user.hospital, {
    eager: true,
    nullable: false,
  })
  user: User;

  @OneToMany(() => Doctor, (doctor) => doctor.hospital)
  doctor: Doctor[];
}
