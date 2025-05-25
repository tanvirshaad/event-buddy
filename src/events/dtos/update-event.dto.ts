import {
  IsDateString,
  IsString,
  IsOptional,
  IsInt,
  Min,
} from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  totalCapacity?: number;

  @IsOptional()
  bookedSeats?: number;
}
