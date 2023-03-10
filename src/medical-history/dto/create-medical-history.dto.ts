import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { CreatePatientDto } from 'src/patients/dto/create-patient.dto';

export class CreateMedicalHistoryDto {
  @ApiProperty({ description: 'Identificador del médico', type: String })
  @IsNotEmpty()
  @IsObject()
  doctor: CreateDoctorDto;

  @ApiProperty({ description: 'Identificador del paciente', type: String })
  @IsNotEmpty()
  @IsObject()
  patient: CreatePatientDto;

  @ApiProperty({
    description: 'Observaciones del historial médico',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  observations: string;

  @ApiProperty({ description: 'Estado de salud del paciente', type: String })
  @IsString()
  @IsNotEmpty()
  healthStatus: string;
}
