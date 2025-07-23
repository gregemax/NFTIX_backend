import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { Event, EventSchema } from "./schemas/event.schema";
import { UsersModule } from "src/users/users.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventSchema }]),  // No need to repeat Event schema
    UsersModule,  // Import UsersModule to make UserModel available
  ],
  controllers: [EventsController],
  providers: [EventsService],
  exports: [EventsService],  // Export the service if you need to use it elsewhere
})
export class EventsModule {}
