import { Validator } from '../../../utils/validator';
import { IsNotEmpty, IsString, IsEmail, Matches, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto extends Validator {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  public name!: string;
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  public email!: string;
}
