import {
  Controller,
  Post,
  Body,
  Get,
  Req,
  Request,
  UseGuards,
} from '@nestjs/common';

import { BookingsService } from './bookings.service';
import { EventsService } from '../events/events.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { Booking } from './booking.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ApiOperation,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

@Controller('bookings')
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
    private readonly eventsService: EventsService,
  ) {}

  @ApiOperation({ summary: 'Create a booking' })
  @ApiResponse({ status: 201, description: 'Booking created', type: Booking })
  @ApiBadRequestResponse({ description: 'Invalid input or not enough seats' })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBearerAuth('JWT')
  @ApiForbiddenResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
  @Post()
  public async createBooking(
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: Request & { user: { id: number } },
  ): Promise<Booking> {
    return this.bookingsService.createBooking(createBookingDto, req.user.id);
  }

  // @Get()
  // public async getAllBookings(): Promise<Booking[]> {
  //   return this.bookingsService.getAllBookings();
  // }

  @ApiOperation({ summary: 'Get user bookings' })
  @ApiResponse({
    status: 200,
    description: 'List of user bookings',
    type: [Booking],
  })
  @ApiBearerAuth('JWT')
  @ApiForbiddenResponse({ description: 'Unauthorized' })
  @UseGuards(JwtAuthGuard)
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
