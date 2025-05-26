import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsString,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class UpdateEventDto {
  @ApiProperty({
    description: 'Event name',
    example: 'Tech Conference 2023',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Event description',
    example: 'A conference about the latest in technology.',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Event date in ISO format',
    example: '2023-10-15T10:00:00Z',
    required: false,
  })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiProperty({
    description: 'Event location',
    example: '123 Tech Street, Silicon Valley, CA',
    required: false,
    minimum: 1,
  })
  @IsInt()
  @Min(1)
  @IsOptional()
  totalCapacity?: number;

  @ApiProperty({
    description: 'No. of seats booked for the event',
    example: '123',
    required: false,
  })
  @IsOptional()
  bookedSeats?: number;
}
