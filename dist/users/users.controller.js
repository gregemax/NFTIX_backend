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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    findAll() {
        return this.usersService.findAll();
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    findByWallet(address) {
        return this.usersService.findByWalletAddress(address);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
    addFavorite(id, eventId) {
        return this.usersService.addFavoriteEvent(id, eventId);
    }
    removeFavorite(id, eventId) {
        return this.usersService.removeFavoriteEvent(id, eventId);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new user" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "User created successfully" }),
    (0, swagger_1.ApiResponse)({ status: 400, description: "Validation failed" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all users" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "List of users" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get user by ID" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID (UUID or Mongo ID)" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User found" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)("wallet/:address"),
    (0, swagger_1.ApiOperation)({ summary: "Get user by wallet address" }),
    (0, swagger_1.ApiParam)({ name: "address", description: "Wallet address" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User found by wallet address" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    __param(0, (0, common_1.Param)("address")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findByWallet", null);
__decorate([
    (0, common_1.Patch)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Update user" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User updated successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":id"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Delete user" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "User deleted successfully" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User not found" }),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(":id/favorites/:eventId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Add event to favorites" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID" }),
    (0, swagger_1.ApiParam)({ name: "eventId", description: "Event ID to add to favorites" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Event added to favorites" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User or event not found" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("eventId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "addFavorite", null);
__decorate([
    (0, common_1.Delete)(":id/favorites/:eventId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: "Remove event from favorites" }),
    (0, swagger_1.ApiParam)({ name: "id", description: "User ID" }),
    (0, swagger_1.ApiParam)({ name: "eventId", description: "Event ID to remove from favorites" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Event removed from favorites" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "User or event not found" }),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Param)("eventId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "removeFavorite", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)("users"),
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map