import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  public async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const eventDate = new Date(createEventDto.date);

    if (eventDate <= new Date()) {
      throw new BadRequestException('Event date must be in the future');
    }

    const newEvent = this.eventRepository.create({
      ...createEventDto,
      date: eventDate,
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

  //update event
  public async updateEvent(
    eventId: number,
    updateEventDto: UpdateEventDto,
  ): Promise<Event> {
    const event = await this.getEventDetails(eventId);
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found`);
    }
    const updatedEvent = {
      ...event,
      ...updateEventDto,
    };
    if (updateEventDto.date) {
      const eventDate = new Date(updateEventDto.date);
      if (eventDate <= new Date()) {
        throw new BadRequestException('Event date must be in the future');
      }
      updatedEvent.date = eventDate;
    }
    return this.eventRepository.save(updatedEvent);
  }
}
