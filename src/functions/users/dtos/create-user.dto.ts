import { IsNotEmpty, IsString, IsEmail, Matches, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  public name!: string;
  @IsEmail()
  @IsNotEmpty()
  public email!: string;
  // @IsString()
  // @IsNotEmpty()
  // @MinLength(8)
  // @Matches('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,100}$')
  // public password!: string;
}
