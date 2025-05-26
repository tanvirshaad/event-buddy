import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { Booking } from '../bookings/booking.entity';
import { ApiProperty } from '@nestjs/swagger';

export enum Role {
  USER = 'user',
  ADMIN = 'admin',
}

@Entity('users')
export class User {
  @ApiProperty({ description: 'Unique identifier for the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Email address of the user',
    example: 'john@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ description: 'Password of the user' })
  @Column()
  password: string;

  @ApiProperty({ description: 'Firstname of the user', example: 'John' })
  @Column()
  firstName: string;

  @ApiProperty({ description: 'Lastname of the user', example: 'Doe' })
  @Column()
  lastName: string;

  @ApiProperty({
    description: 'User role',
    enum: ['user', 'admin'],
    example: 'user',
  })
  @Column({ type: 'enum', enum: ['user', 'admin'], default: 'user' })
  role: 'user' | 'admin';

  @ApiProperty({ description: 'User bookings', type: () => [Booking] })
  @OneToMany(() => Booking, (booking) => booking.user)
  bookings: Booking[];

  @ApiProperty({
    description: 'User creation date',
    example: '2025-05-26T12:00:00Z',
  })
  @CreateDateColumn()
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({
    description: 'User update date',
    example: '2025-05-26T12:00:00Z',
  })
  @UpdateDateColumn()
  updatedAt: Date;
}
