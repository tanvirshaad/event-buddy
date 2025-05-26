import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from '../bookings/booking.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('events')
export class Event {
  @ApiProperty({ description: 'Unique identifier for the event' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Name of the event',
    example: 'Tech Conference 2025',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'Description of the event',
    example: 'A conference about the latest in technology.',
  })
  @Column('text')
  description: string;

  @ApiProperty({
    description: 'Event start date in ISO format',
    example: '2025-10-15T10:00:00Z',
  })
  @Column({ type: 'timestamp' })
  startDate: Date;

  @ApiProperty({
    description: 'Event end date in ISO format',
    example: '2025-10-15T18:00:00Z',
  })
  @Column({ type: 'timestamp' })
  endDate: Date;

  @ApiProperty({
    description: 'Event tags for categorization',
    example: ['technology', 'conference', 'networking'],
  })
  @Column('text', { array: true, default: [] })
  tags: string[];

  @ApiProperty({
    description: 'Event location',
    example: '123 Tech Street, Silicon Valley, CA',
  })
  @Column()
  location: string;

  @ApiProperty({
    description: 'Event image URL',
    example: 'https://example.com/event-image.jpg',
  })
  @Column()
  imageUrl: string;

  @ApiProperty({
    description: 'Total capacity of the event',
    example: 500,
  })
  @Column({ type: 'int' })
  totalCapacity: number;

  @ApiProperty({
    description: 'Number of seats booked for the event',
    example: 0,
  })
  @Column({ type: 'int', default: 0 })
  bookedSeats: number;

  @ApiProperty({
    description: 'Creation date of the event',
    example: '2025-05-26T12:00:00Z',
  })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'Last update date of the event',
    example: '2025-05-26T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({
    description: 'Bookings associated with the event',
    type: () => [Booking],
  })
  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];
}
