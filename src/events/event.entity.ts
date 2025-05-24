import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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
}
