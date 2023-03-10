import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/infraestructure/doctor.entity';
import { CommonFilterService } from 'src/common/commonFilterService';
import { User } from 'src/infraestructure/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor, User])],
  controllers: [DoctorController],
  providers: [DoctorService, CommonFilterService],
})
export class DoctorModule {}
