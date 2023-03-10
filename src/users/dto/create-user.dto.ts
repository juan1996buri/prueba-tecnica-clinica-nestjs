import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { RolesTypes } from 'src/common/enum/roles.enum';
import { CreateDoctorDto } from 'src/doctor/dto/create-doctor.dto';

export class CreateUserDto {
  @ApiProperty({ description: 'Identificador del usuario' })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({ description: 'Dirección de correo electrónico del usuario' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Número de teléfono del usuario' })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Contraseña del usuario' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'Rol del usuario' })
  @IsNotEmpty()
  @IsEnum(RolesTypes, {
    message: `los roles que se admite es: ${Object.keys(RolesTypes)}`,
  })
  @IsString()
  role: string;

  @ApiProperty({ description: 'otp del usuario' })
  @IsOptional()
  @IsString()
  otpSecret: string;

  @IsOptional()
  doctor: CreateDoctorDto[];
}
