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
      entities: [User],
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
