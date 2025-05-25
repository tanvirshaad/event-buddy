import { Controller, Param, ParseIntPipe } from '@nestjs/common';
import { EventsService } from './events.service';
import { Get, Post, Body } from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  public async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @Get()
  public async getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Get('/upcoming-events')
  public async getUpcomingEvents() {
    return this.eventsService.getUpcomingEvents();
  }

  @Get('/past-events')
  public async getPastEvents() {
    return this.eventsService.getPastEvents();
  }

  @Get(':id')
  public async getEventDetails(@Param('id', ParseIntPipe) eventId: number) {
    return this.eventsService.getEventDetails(eventId);
  }
}
