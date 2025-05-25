import { IsNotEmpty, Max, Min, IsNumber } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  eventId: number;

  @IsNumber()
  @Min(1, { message: 'Number of seats must be at least 1' })
  @Max(4, { message: 'Number of seats cannot exceed 4' })
  numberOfSeats: number;
}
