import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hospital } from 'src/infraestructure/hospital.entity';
import { CommonFilterService } from 'src/common/commonFilterService';

@Module({
  imports: [TypeOrmModule.forFeature([Hospital])],
  controllers: [HospitalController],
  providers: [HospitalService, CommonFilterService],
})
export class HospitalModule {}
