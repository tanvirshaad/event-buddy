import {
  Controller,
  Post,
  Body,
  Get,
  ParseIntPipe,
  Query,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';

import { BookingsService } from './bookings.service';
import { EventsService } from '../events/events.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { Booking } from './booking.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly eventsService: EventsService,
  ) {}

  @Post()
  public async createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: Request & { user: { id: number } },
  ): Promise<Booking> {
    return this.bookingsService.createBooking(createBookingDto, req.user.id);
  }

  @Get()
  public async getAllBookings(): Promise<Booking[]> {
    return this.bookingsService.getAllBookings();
  }
  @Get('/myBookings')
  public async getUserBookings(
    @Req() req: Request & { user: { id: number } },
  ): Promise<Booking[]> {
    if (!req.user) {
      throw new Error('User not authenticated');
    }
    return this.bookingsService.getUserBookings(req.user.id);
  }
}
