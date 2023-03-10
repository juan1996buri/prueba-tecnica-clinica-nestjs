import { IsNotEmpty, IsString } from 'class-validator';

export class EditPasswordDTO {
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsString()
  passwordOld: string;
  @IsNotEmpty()
  @IsString()
  passwordNew: string;
}
