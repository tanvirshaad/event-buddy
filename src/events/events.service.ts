import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dtos/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  public async createEvent(@Body() eventData: CreateEventDto): Promise<Event> {
    const event = this.eventRepository.create(eventData);
    return this.eventRepository.save(event);
  }

  public async getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }
}
