import { IsString, IsEmail, IsOptional, IsBoolean } from "class-validator"
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"

export class CreateUserDto {
  @ApiProperty({ description: "Wallet address" })
  @IsString()
  walletAddress: string

  @ApiPropertyOptional({ description: "User email" })
  @IsEmail()
  @IsOptional()
  email?: string

  @ApiPropertyOptional({ description: "Username" })
  @IsString()
  @IsOptional()
  username?: string

  @ApiPropertyOptional({ description: "Avatar URL" })
  @IsString()
  @IsOptional()
  avatar?: string

  @ApiPropertyOptional({ description: "Is event organizer" })
  @IsBoolean()
  @IsOptional()
  isEventOrganizer?: boolean
}
