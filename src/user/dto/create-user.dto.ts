import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty({ description: 'Enter name of user > ', minLength: 3, default: 'Hamed', maxLength: 500 })
  readonly name: string;

  @ApiProperty({ description: 'Enter username > ', minLength: 5, default: 'hamed_m', maxLength: 500 })
  readonly username: string;

  @ApiProperty({ description: 'Enter password > ', minLength: 5, default: 'hamed_m', maxLength: 500 })
  readonly password: string;
}