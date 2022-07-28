import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string

  @IsString()
  @IsNotEmpty()
  last_name: string

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsNumber()
  @IsNotEmpty()
  role_id: number

  @IsNumber()
  user_id: number
}
