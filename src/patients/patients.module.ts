import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/infraestructure/patient.entity';
import { CommonFilterService } from 'src/common/commonFilterService';

@Module({
  imports: [TypeOrmModule.forFeature([Patient])],
  controllers: [PatientsController],
  providers: [PatientsService, CommonFilterService],
})
export class PatientsModule {}
