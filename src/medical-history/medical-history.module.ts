import { Module } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryController } from './medical-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicalHistory } from 'src/infraestructure/medical-history.entity';
import { CommonFilterService } from 'src/common/commonFilterService';

@Module({
  imports: [TypeOrmModule.forFeature([MedicalHistory])],
  controllers: [MedicalHistoryController],
  providers: [MedicalHistoryService, CommonFilterService],
})
export class MedicalHistoryModule {}
