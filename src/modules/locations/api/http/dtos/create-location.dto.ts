import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateLocationDto {
  @ApiProperty({
    example: 1,
    description: 'Id of building',
    required: true,
  })
  @IsInt()
  @Min(1)
  buildingId: number;

  @ApiProperty({
    example: 'Car Park',
    description: 'Location name',
    required: true,
  })
  @IsString()
  @Length(1)
  name: string;

  @ApiProperty({
    example: 'A-CarPark',
    description: 'Location number',
    required: true,
  })
  @IsString()
  @Length(1)
  number: string;

  @ApiProperty({
    example: 80.62,
    description: 'Location area, calc by m2',
    required: true,
  })
  @IsNumber()
  area: number;

  @ApiProperty({
    example: 1,
    description: 'Ancestor location, if you pass 0 then location is root',
    required: false,
  })
  @IsOptional()
  @IsInt()
  @Min(0)
  ancestorId: number;
}
