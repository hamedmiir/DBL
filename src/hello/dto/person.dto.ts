import { IsNumber, IsOptional, Length, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PersonDto {
  @Length(3, 10)
  @ApiProperty({ description: 'Enter your name > ', minLength: 3, default: 'Ali', maxLength: 10 })
  name: string;

  @IsNumber()
  @IsOptional()
  @Min(1960)
  @ApiPropertyOptional({ description: 'Optional', default: 1990, minimum: 1960, maximum: 2020})
  year: number;
}
