import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

export class CreatePatientDto {
  @ApiProperty({ description: 'Nombre del paciente' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Dirección del paciente' })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({ description: 'Fecha de nacimiento del paciente' })
  @IsNotEmpty()
  @IsDate()
  dateOfBirth: Date;

  @ApiProperty({ description: 'Usuario asociado al paciente' })
  @IsObject()
  user: CreateUserDto;
}
