import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Request } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from "@nestjs/swagger"
import  { EventsService } from "./events.service"
import  { CreateEventDto } from "./dto/create-event.dto"
import  { UpdateEventDto } from "./dto/update-event.dto"
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"
import { EventStatus } from "./schemas/event.schema"

@ApiTags("events")
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Create a new event" })
  create(createEventDto: CreateEventDto, @Request() req) {
    return this.eventsService.create({
      ...createEventDto,
      organizer: req.user.userId,
    })
  }

  @Get()
  @ApiOperation({ summary: "Get all events" })
  @ApiQuery({ name: "category", required: false })
  @ApiQuery({ name: "status", required: false, enum: EventStatus })
  @ApiQuery({ name: "organizer", required: false })
  @ApiQuery({ name: "featured", required: false, type: Boolean })
  findAll(
    @Query('category') category?: string,
    @Query('status') status?: EventStatus,
    @Query('organizer') organizer?: string,
    @Query('featured') featured?: boolean,
  ) {
    return this.eventsService.findAll({ category, status, organizer, featured })
  }

  @Get("featured")
  @ApiOperation({ summary: "Get featured events" })
  getFeatured() {
    return this.eventsService.getFeaturedEvents()
  }

  @Get("upcoming")
  @ApiOperation({ summary: "Get upcoming events" })
  getUpcoming() {
    return this.eventsService.getUpcomingEvents()
  }

  @Get('search')
  @ApiOperation({ summary: 'Search events' })
  @ApiQuery({ name: 'q', description: 'Search query' })
  search(@Query('q') query: string) {
    return this.eventsService.searchEvents(query);
  }

  @Get('organizer/:organizerId')
  @ApiOperation({ summary: 'Get events by organizer' })
  getByOrganizer(@Param('organizerId') organizerId: string) {
    return this.eventsService.getEventsByOrganizer(organizerId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get event by ID' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update event" })
  update(@Param('id') id: string, updateEventDto: UpdateEventDto, @Request() req) {
    return this.eventsService.update(id, updateEventDto, req.user.userId)
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Delete event" })
  remove(@Param('id') id: string, @Request() req) {
    return this.eventsService.remove(id, req.user.userId)
  }

  @Patch(":id/tickets/:tierId/sales")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update ticket sales" })
  updateTicketSales(@Param('id') id: string, @Param('tierId') tierId: string, @Body('quantity') quantity: number) {
    return this.eventsService.updateTicketSales(id, tierId, quantity)
  }
}
