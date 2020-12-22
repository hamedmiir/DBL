import { ApiProperty } from '@nestjs/swagger';

export default class CreateGenreDto {
  @ApiProperty({ description: 'Enter genre name > ', minLength: 3, default: 'horror', maxLength: 25 })
  readonly type: string;
}