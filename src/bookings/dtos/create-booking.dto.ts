import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, Min, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ description: 'Event ID' })
  @IsNotEmpty()
  eventId: number;

  @ApiProperty({ description: 'Number of seats to book (1-4)', example: 2 })
  @IsNumber()
  @Min(1, { message: 'Number of seats must be at least 1' })
  @Max(4, { message: 'Number of seats cannot exceed 4' })
  numberOfSeats: number;
}
