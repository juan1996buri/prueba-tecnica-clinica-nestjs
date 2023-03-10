import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ActiveUserDTO {
  @ApiProperty({ description: 'otp del usuario' })
  @IsNotEmpty()
  @IsUUID()
  otpSecret: string;

  @ApiProperty({ description: 'correo electrónico del usuario' })
  @IsNotEmpty()
  @IsString()
  email: string;
}
