import { IsNotEmpty, IsEmail } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  readonly passwordHash?: string

  readonly firstName?: string

  readonly lastName?: string
}
