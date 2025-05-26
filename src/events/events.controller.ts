import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { Get, Post, Body } from '@nestjs/common';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(AdminGuard)
  @Post()
  public async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
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

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get(':id')
  public async getEventDetails(@Param('id', ParseIntPipe) eventId: number) {
    return this.eventsService.getEventDetails(eventId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post(':id')
  public async updateEvent(
    @Param('id', ParseIntPipe) eventId: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.updateEvent(eventId, updateEventDto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  public async deleteEvent(@Param('id', ParseIntPipe) eventId: number) {
    return this.eventsService.deleteEvent(eventId);
  }
}
