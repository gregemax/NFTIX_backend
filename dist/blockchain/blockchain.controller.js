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
exports.BlockchainController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const blockchain_service_1 = require("./blockchain.service");
let BlockchainController = class BlockchainController {
    constructor(blockchainService) {
        this.blockchainService = blockchainService;
    }
    deployContract(eventData) {
        return this.blockchainService.deployEventContract(eventData);
    }
    mintTicket(ticketData) {
        return this.blockchainService.mintTicketNFT(ticketData);
    }
    validateTicket(tokenId) {
        return this.blockchainService.validateTicketOnChain(tokenId);
    }
    transferTicket(transferData) {
        return this.blockchainService.transferTicketNFT(transferData.tokenId, transferData.fromAddress, transferData.toAddress);
    }
    getGasEstimate(operation) {
        return this.blockchainService.getGasEstimate(operation);
    }
};
exports.BlockchainController = BlockchainController;
__decorate([
    (0, common_1.Post)("deploy-contract"),
    (0, swagger_1.ApiOperation)({ summary: "Deploy event contract to blockchain" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlockchainController.prototype, "deployContract", null);
__decorate([
    (0, common_1.Post)("mint-ticket"),
    (0, swagger_1.ApiOperation)({ summary: "Mint ticket NFT" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlockchainController.prototype, "mintTicket", null);
__decorate([
    (0, common_1.Get)('validate/:tokenId'),
    (0, swagger_1.ApiOperation)({ summary: 'Validate ticket on blockchain' }),
    __param(0, (0, common_1.Param)('tokenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlockchainController.prototype, "validateTicket", null);
__decorate([
    (0, common_1.Post)("transfer"),
    (0, swagger_1.ApiOperation)({ summary: "Transfer ticket NFT" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BlockchainController.prototype, "transferTicket", null);
__decorate([
    (0, common_1.Get)('gas-estimate/:operation'),
    (0, swagger_1.ApiOperation)({ summary: 'Get gas estimate for operation' }),
    __param(0, (0, common_1.Param)('operation')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BlockchainController.prototype, "getGasEstimate", null);
exports.BlockchainController = BlockchainController = __decorate([
    (0, swagger_1.ApiTags)("blockchain"),
    (0, common_1.Controller)("blockchain"),
    __metadata("design:paramtypes", [blockchain_service_1.BlockchainService])
], BlockchainController);
//# sourceMappingURL=blockchain.controller.js.map