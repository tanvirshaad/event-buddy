import { Controller } from '@nestjs/common';
import { EventsService } from './events.service';
import { Get, Post, Body } from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  public async getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Post()
  public async createEvent(@Body() eventData: CreateEventDto) {
    return this.eventsService.createEvent(eventData);
  }
}
