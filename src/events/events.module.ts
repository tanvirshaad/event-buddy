import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { Event } from './event.entity';
import { EventsService } from './events.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],
})
export class EventsModule {}
