import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, MoreThanOrEqual, Repository } from 'typeorm';
import { Event } from './event.entity';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import e from 'express';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {}

  public async createEvent(createEventDto: CreateEventDto): Promise<Event> {
    const eventStartDate = new Date(createEventDto.startDate);
    const eventEndDate = new Date(createEventDto.endDate);

    if (eventStartDate <= new Date()) {
      throw new BadRequestException('Event date must be in the future');
    }
    if (eventEndDate <= eventStartDate) {
      throw new BadRequestException('Event end date must be after start date');
    }

    const newEvent = this.eventRepository.create({
      ...createEventDto,
      startDate: eventStartDate,
      endDate: eventEndDate,
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
        startDate: MoreThanOrEqual(currentDate),
      },
      order: {
        startDate: 'ASC',
      },
    });
  }

  //get past events
  public async getPastEvents(): Promise<Event[]> {
    const currentDate = new Date();
    return this.eventRepository.find({
      where: {
        endDate: LessThan(currentDate),
      },
      order: {
        endDate: 'DESC',
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
    if (updateEventDto.startDate && updateEventDto.endDate) {
      const startDate = new Date(updateEventDto.startDate);
      const endDate = new Date(updateEventDto.endDate);
      if (startDate <= new Date()) {
        throw new BadRequestException('Event date must be in the future');
      }
      updatedEvent.startDate = startDate;
      updatedEvent.endDate = endDate;
    }
    return this.eventRepository.save(updatedEvent);
  }

  //delete event
  public async deleteEvent(eventId: number): Promise<void> {
    const event = await this.getEventDetails(eventId);
    if (!event) {
      throw new Error(`Event with ID ${eventId} not found`);
    }
    await this.eventRepository.remove(event);
  }
}
