import { Module } from "@nestjs/common"
import { ConfigModule } from "@nestjs/config"
import { MongooseModule } from "@nestjs/mongoose"
import { AuthModule } from "./auth/auth.module"
import { UsersModule } from "./users/users.module"
import { EventsModule } from "./events/events.module"
import { TicketsModule } from "./tickets/tickets.module"
import { BlockchainModule } from "./blockchain/blockchain.module"
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || "mongodb://localhost:27017/nftix"),
    AuthModule,
    UsersModule,
    EventsModule,
    TicketsModule,
    BlockchainModule,
    PostsModule,
    CommentsModule,
  ],
})
export class AppModule {}
