import { Controller, Get, Post, Patch, Param, Delete, UseGuards } from "@nestjs/common"
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger"
import { UsersService } from "./users.service"  // Remove 'type'
import { CreateUserDto } from "./dto/create-user.dto"  // Remove 'type'
import { UpdateUserDto } from "./dto/update-user.dto"  // Remove 'type'
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard"

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: "Create a new user" })
  create(createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  @ApiOperation({ summary: "Get all users" })
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Get('wallet/:address')
  @ApiOperation({ summary: 'Get user by wallet address' })
  findByWallet(@Param('address') address: string) {
    return this.usersService.findByWalletAddress(address);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Update user" })
  update(@Param('id') id: string, updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  @Post(":id/favorites/:eventId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Add event to favorites" })
  addFavorite(@Param('id') id: string, @Param('eventId') eventId: string) {
    return this.usersService.addFavoriteEvent(id, eventId)
  }

  @Delete(":id/favorites/:eventId")
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Remove event from favorites" })
  removeFavorite(@Param('id') id: string, @Param('eventId') eventId: string) {
    return this.usersService.removeFavoriteEvent(id, eventId)
  }
}
