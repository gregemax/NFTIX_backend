import { Injectable, NotFoundException } from "@nestjs/common"
import { Model } from "mongoose"
import { User, UserDocument } from "./schemas/user.schema"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { InjectModel } from "@nestjs/mongoose"

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto)
    return createdUser.save()
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id).exec()
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return user
  }

  async findByWalletAddress(walletAddress: string): Promise<User> {
    const user = await this.userModel.findOne({ walletAddress }).exec()
    if (!user) {
      // Handle case when the user with the given wallet address is not found
      throw new NotFoundException(`User with wallet address ${walletAddress} not found`)
    }

    // Return the user object without _id being overwritten
    return user.toObject() // Mongoose document converted to plain object
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec()

    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
    return updatedUser
  }

  async remove(id: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(id).exec()
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`)
    }
  }

  async addFavoriteEvent(userId: string, eventId: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, { $addToSet: { favoriteEvents: eventId } }, { new: true }).exec()
  }

  async removeFavoriteEvent(userId: string, eventId: string): Promise<User> {
    return this.userModel.findByIdAndUpdate(userId, { $pull: { favoriteEvents: eventId } }, { new: true }).exec()
  }
}
