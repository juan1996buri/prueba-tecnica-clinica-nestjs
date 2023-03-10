import {
  IsEmpty,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateHospitalDto } from 'src/hospital/dto/create-hospital.dto';

export class CreateDoctorDto {
  @ApiProperty({ description: 'Identificador del doctor' })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({ description: 'Nombre del doctor' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Apellido del doctor' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'Dirección del doctor' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Especialidad del doctor' })
  @IsNotEmpty()
  @IsString()
  specialty: string;

  @ApiProperty({ description: 'ID del usuario asociado a este doctor' })
  @IsNotEmpty()
  @IsObject()
  user: CreateUserDto;

  @ApiProperty({ description: 'ID del hospital asociado a este doctor' })
  @IsNotEmpty()
  @IsObject()
  hospital: CreateHospitalDto;
}
