import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreateHospitalDto {
  @ApiProperty({ description: 'Id del hospital' })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({ description: 'Nombre del hospital' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Dirección del hospital' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Servicios que ofrece el hospital' })
  @IsNotEmpty()
  @IsString()
  services: string;

  @ApiProperty({ description: 'ID del usuario asociado a este hospital' })
  @IsNotEmpty()
  @IsObject()
  user: CreateUserDto;

  @IsOptional()
  doctor: CreateDoctorDto[];
}
