import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from './booking.entity';
import { Event } from '../events/event.entity';
import { EventsService } from '../events/events.service';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { UsersService } from '../users/users.service'; // Adjust the import path as necessary

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    private readonly eventsService: EventsService,
    private readonly usersService: UsersService,
  ) {}

  public async createBooking(
    createBookingDto: CreateBookingDto,
    userId: number,
  ): Promise<Booking> {
    const { eventId, numberOfSeats } = createBookingDto;
    // Validate the event exists
    try {
      const event = await this.eventsService.getEventDetails(eventId);
      const user = await this.usersService.getUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      if (!event) {
        throw new Error('Event not found');
      }
      //prevent booking an event that has already passed
      if (new Date(event.startDate) < new Date()) {
        throw new Error('Cannot book a past event');
      }
      // Check if enough seats are available
      if (event.totalCapacity - event.bookedSeats < numberOfSeats) {
        throw new Error('Not enough seats available');
      }

      const booking = this.bookingRepository.create({
        user,
        event,
        numberOfSeats,
      });
      // Update the event's booked seats
      event.bookedSeats += numberOfSeats;

      await this.bookingRepository.save(booking);
      await this.eventsService.updateEvent(eventId, {
        bookedSeats: event.bookedSeats,
      });

      return booking;
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error('Failed to create booking');
    }
  }

  // public async getAllBookings(): Promise<Booking[]> {
  //   try {
  //     return await this.bookingRepository.find({
  //       relations: ['event'],
  //     });
  //   } catch (error) {
  //     throw error instanceof Error
  //       ? error
  //       : new Error(`Failed to retrieve bookings`);
  //   }
  // }

  //get user's booking
  public async getUserBookings(userId: number): Promise<Booking[]> {
    try {
      return await this.bookingRepository.find({
        where: { user: { id: userId } },
        relations: ['event', 'user'],
      });
    } catch (error) {
      throw error instanceof Error
        ? error
        : new Error(`Failed to retrieve bookings for user ${userId}`);
    }
  }
}
