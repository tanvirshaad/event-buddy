import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dtos/create-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  public async createEvent(
    @Body() createEventDto: CreateEventDto,
  ): Promise<Event> {
    const newEvent = this.eventRepository.create({
      ...createEventDto,
      date: new Date(createEventDto.date),
      bookedSeats: 0,
    });
    return this.eventRepository.save(newEvent);
  }

  public async getAllEvents(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  //get upcoming events
  public async getUpcomingEvents(): Promise<Event[]> {
    const currentDate = new Date();
    return this.eventRepository.find({
      where: {
        date: MoreThanOrEqual(currentDate),
      },
      order: {
        date: 'ASC',
      },
    });
  }

  //get past events
  public async getPastEvents(): Promise<Event[]> {
    const currentDate = new Date();
    return this.eventRepository.find({
      where: {
        date: LessThan(currentDate),
      },
      order: {
        date: 'DESC',
      },
    });
  }

  //get details of a specific event
  public async getEventDetails(eventId: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: eventId },
    });
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found`);
    }
    return event;
  }
}
