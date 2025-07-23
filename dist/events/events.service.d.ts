import { Model } from "mongoose";
import { Event, EventDocument, EventStatus } from "./schemas/event.schema";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
export declare class EventsService {
    private readonly eventModel;
    constructor(eventModel: Model<EventDocument>);
    create(createEventDto: CreateEventDto): Promise<Event>;
    findAll(filters?: {
        category?: string;
        status?: EventStatus;
        organizer?: string;
        featured?: boolean;
    }): Promise<Event[]>;
    findOne(id: string): Promise<Event>;
    update(id: string, updateEventDto: UpdateEventDto, userId: string): Promise<Event>;
    remove(id: string, userId: string): Promise<void>;
    searchEvents(query: string): Promise<Event[]>;
    getFeaturedEvents(): Promise<Event[]>;
    getUpcomingEvents(): Promise<Event[]>;
    getEventsByOrganizer(organizerId: string): Promise<Event[]>;
    updateTicketSales(eventId: string, tierId: string, quantity: number): Promise<Event>;
}
