import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Booking } from '../bookings/booking.entity';
import { User } from '../users/user.entity';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'timestamp' })
  date: Date;

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
