import {
  IsString,
  IsNotEmpty,
  IsDateString,
  IsUrl,
  IsInt,
  Min,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @IsInt()
  @Min(1)
  totalCapacity: number;
}
