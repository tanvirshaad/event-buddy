import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsUrl,
  IsInt,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({ description: 'Event name', example: 'Tech Conference 2023' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Event description',
    example: 'A conference about the latest in technology.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Event start date in ISO format',
    example: '2023-10-15T10:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'Event end date in ISO format',
    example: '2023-10-15T18:00:00Z',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({
    description: 'Event tags for categorization',
    example: ['technology', 'conference', 'networking'],
  })
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  tags: string[];

  @ApiProperty({
    description: 'Event location',
    example: '123 Tech Street, Silicon Valley, CA',
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    description: 'Event image URL',
    example: 'https://example.com/event-image.jpg',
  })
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({
    description: 'Total capacity of the event',
    example: 100,
  })
  @IsInt()
  @Min(1)
  totalCapacity: number;
}
