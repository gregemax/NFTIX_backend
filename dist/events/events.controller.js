"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const events_service_1 = require("./events.service");
const create_event_dto_1 = require("./dto/create-event.dto");
const update_event_dto_1 = require("./dto/update-event.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const event_schema_1 = require("./schemas/event.schema");
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    create(createEventDto, req) {
        return this.eventsService.create({
            ...createEventDto,
            organizer: req.user.userId,
        });
    }
    findAll(category, status, organizer, featured) {
        return this.eventsService.findAll({ category, status, organizer, featured });
    }
    getFeatured() {
        return this.eventsService.getFeaturedEvents();
    }
    getUpcoming() {
        return this.eventsService.getUpcomingEvents();
    }
    search(query) {
        return this.eventsService.searchEvents(query);
    }
    getByOrganizer(organizerId) {
        return this.eventsService.getEventsByOrganizer(organizerId);
    }
    findOne(id) {
        return this.eventsService.findOne(id);
    }
    update(id, updateEventDto, req) {
        return this.eventsService.update(id, updateEventDto, req.user.userId);
    }
    remove(id, req) {
        return this.eventsService.remove(id, req.user.userId);
    }
    updateTicketSales(id, tierId, quantity) {
        return this.eventsService.updateTicketSales(id, tierId, quantity);
    }
};
exports.EventsController = EventsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new event" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Event created successfully" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Validation failed" }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all events" }),
    (0, swagger_1.ApiQuery)({ name: "category", required: false }),
    (0, swagger_1.ApiQuery)({ name: "status", required: false, enum: event_schema_1.EventStatus }),
    (0, swagger_1.ApiQuery)({ name: "organizer", required: false }),
    (0, swagger_1.ApiQuery)({ name: "featured", required: false, type: Boolean }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of events" }),
    __param(0, (0, common_1.Query)("category")),
    __param(1, (0, common_1.Query)("status")),
    __param(2, (0, common_1.Query)("organizer")),
    __param(3, (0, common_1.Query)("featured")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("featured"),
    (0, swagger_1.ApiOperation)({ summary: "Get featured events" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Featured events" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getFeatured", null);
__decorate([
    (0, common_1.Get)("upcoming"),
    (0, swagger_1.ApiOperation)({ summary: "Get upcoming events" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Upcoming events" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getUpcoming", null);
__decorate([
    (0, common_1.Get)("search"),
    (0, swagger_1.ApiOperation)({ summary: "Search events" }),
    (0, swagger_1.ApiQuery)({ name: "q", description: "Search query" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Search results" }),
    __param(0, (0, common_1.Query)("q")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "search", null);
__decorate([
    (0, common_1.Get)("organizer/:organizerId"),
    (0, swagger_1.ApiOperation)({ summary: "Get events by organizer" }),
    (0, swagger_1.ApiParam)({ name: "organizerId", description: "Organizer ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Events by organizer" }),
    __param(0, (0, common_1.Param)("organizerId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "getByOrganizer", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get event by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Event ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Event found" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Event not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Update event" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Event ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Event updated successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Event not found" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_event_dto_1.UpdateEventDto, Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Delete event" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Event ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Event deleted successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Event not found" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "remove", null);
__decorate([
    (0, common_1.Patch)(":id/tickets/:tierId/sales"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Update ticket sales" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "Event ID" }),
    (0, swagger_1.ApiParam)({ name: "tierId", description: "Ticket Tier ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Ticket sales updated" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Event or tier not found" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("tierId")),
    __param(2, (0, common_1.Body)("quantity")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "updateTicketSales", null);
exports.EventsController = EventsController = __decorate([
    (0, swagger_1.ApiTags)("events"),
    (0, common_1.Controller)("events"),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
//# sourceMappingURL=events.controller.js.map