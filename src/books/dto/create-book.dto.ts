import { ApiProperty } from '@nestjs/swagger';

export default class CreateBookDto {
  @ApiProperty({ description: 'Enter book name > ', minLength: 5, default: 'Bible', maxLength: 50 })
  readonly name: string;

  @ApiProperty({ description: 'Enter user ID > ', minLength: 1, default: 1, maxLength: 1000 })
  readonly userID: number;

  @ApiProperty({ description: 'Enter genre IDs > ', minLength: 3, default: 1, maxLength: 1000 })
  readonly genreIDs: number[];
}