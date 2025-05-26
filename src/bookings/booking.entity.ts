import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from '../events/event.entity';
import { User } from '../users/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('bookings')
export class Booking {
  @ApiProperty({ description: 'Unique identifier for the booking' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'User who made the booking',
    type: () => User,
  })
  @ManyToOne(() => User, (user) => user.bookings)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ApiProperty({
    description: 'Event for which the booking was made',
    type: () => Event,
  })
  @ManyToOne(() => Event, (event) => event.bookings)
  @JoinColumn({ name: 'eventId' })
  event: Event;

  @ApiProperty({
    description: 'Number of seats booked',
    example: 2,
  })
  @Column()
  numberOfSeats: number;

  @ApiProperty({
    description: 'Booking creation date',
    example: '2025-05-26T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Booking last update date',
    example: '2025-05-26T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
