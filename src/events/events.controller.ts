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
import {
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiForbiddenResponse,
} from '@nestjs/swagger';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @ApiOperation({ summary: 'Create a new event (admin only)' })
  @ApiResponse({ status: 201, description: 'Event created', type: Event })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiBearerAuth('JWT')
  @ApiForbiddenResponse({ description: 'Admin access required' })
  @UseGuards(AdminGuard)
  @Post()
  public async createEvent(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.createEvent(createEventDto);
  }

  @ApiOperation({ summary: 'Get all events (admin only)' })
  @ApiResponse({
    status: 200,
    description: 'List of all events',
    type: [Event],
  })
  @ApiBearerAuth('JWT')
  @ApiForbiddenResponse({ description: 'Admin access required' })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Get()
  public async getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @ApiOperation({ summary: 'Get upcoming events' })
  @ApiResponse({
    status: 200,
    description: 'List of upcoming events',
    type: [Event],
  })
  @Get('/upcoming-events')
  public async getUpcomingEvents() {
    return this.eventsService.getUpcomingEvents();
  }

  @ApiOperation({ summary: 'Get previous events' })
  @ApiResponse({
    status: 200,
    description: 'List of previous events',
    type: [Event],
  })
  @Get('/past-events')
  public async getPastEvents() {
    return this.eventsService.getPastEvents();
  }

  @ApiOperation({ summary: 'Get event details by ID' })
  @ApiResponse({ status: 200, description: 'Event details', type: Event })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @Get(':id')
  public async getEventDetails(@Param('id', ParseIntPipe) eventId: number) {
    return this.eventsService.getEventDetails(eventId);
  }

  @ApiOperation({ summary: 'Update an event (admin only)' })
  @ApiResponse({ status: 200, description: 'Event updated', type: Event })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBearerAuth('JWT')
  @ApiForbiddenResponse({ description: 'Admin access required' })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Post(':id')
  public async updateEvent(
    @Param('id', ParseIntPipe) eventId: number,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventsService.updateEvent(eventId, updateEventDto);
  }

  @ApiOperation({ summary: 'Delete an event (admin only)' })
  @ApiResponse({ status: 200, description: 'Event deleted' })
  @ApiNotFoundResponse({ description: 'Event not found' })
  @ApiBadRequestResponse({ description: 'Cannot delete event with bookings' })
  @ApiBearerAuth('JWT')
  @ApiForbiddenResponse({ description: 'Admin access required' })
  @UseGuards(JwtAuthGuard, AdminGuard)
  @Delete(':id')
  public async deleteEvent(@Param('id', ParseIntPipe) eventId: number) {
    return this.eventsService.deleteEvent(eventId);
  }
}
