import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from '../bookings/booking.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column('text', { array: true, default: [] })
  tags: string[];

  @Column()
  location: string;

  @Column()
  imageUrl: string;

  @Column({ type: 'int' })
  totalCapacity: number;

  @Column({ type: 'int', default: 0 })
  bookedSeats: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Booking, (booking) => booking.event)
  bookings: Booking[];
}
