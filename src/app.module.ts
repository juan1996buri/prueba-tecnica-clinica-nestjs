import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PatientsModule } from './patients/patients.module';
import { DoctorModule } from './doctor/doctor.module';
import { HospitalModule } from './hospital/hospital.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infraestructure/user.entity';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Doctor } from './infraestructure/doctor.entity';
import { Patient } from './infraestructure/patient.entity';
import { Hospital } from './infraestructure/hospital.entity';
import { MedicalHistory } from './infraestructure/medical-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Doctor, Patient, Hospital, MedicalHistory],
      synchronize: true,
      autoLoadEntities: true,
    }),

    UsersModule,
    PatientsModule,
    DoctorModule,
    HospitalModule,
    MedicalHistoryModule,
    AuthModule,
  ],
})
export class AppModule {}
