import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty({ description: 'Enter user name > ', minLength: 3, default: 'Hamed', maxLength: 50 })
  readonly name: string;
}