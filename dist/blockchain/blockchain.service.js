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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockchainService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@mysten/sui.js/client");
const ed25519_1 = require("@mysten/sui.js/keypairs/ed25519");
const bcs_1 = require("@mysten/bcs");
const transactions_1 = require("@mysten/sui.js/transactions");
const suiClient = new client_1.SuiClient({
    url: (0, client_1.getFullnodeUrl)('testnet'),
});
let BlockchainService = class BlockchainService {
    constructor() {
        this.packageId = '0xYOUR_PACKAGE_ID';
        const privateKey = process.env.SUI_PRIVATE_KEY || '';
        this.keypair = ed25519_1.Ed25519Keypair.fromSecretKey((0, bcs_1.fromB64)(privateKey));
    }
    async deployEventContract(eventData) {
        console.log('Deploying event contract:', eventData.title);
        return '0xFAKE_CONTRACT_ADDR';
    }
    async mintTicketNFT(ticketData) {
        const tx = new transactions_1.TransactionBlock();
        tx.moveCall({
            target: `${this.packageId}::ticket_module::mint_ticket`,
            arguments: [
                tx.pure(ticketData.eventId),
                tx.pure(ticketData.recipient),
                tx.pure(ticketData.metadataUri),
            ],
        });
        const result = await suiClient.signAndExecuteTransactionBlock({
            signer: this.keypair,
            transactionBlock: tx,
            options: {
                showEffects: true,
                showEvents: true,
            },
        });
        const tokenId = result.effects?.created?.[0]?.reference?.objectId || 'unknown';
        const transactionHash = result.digest;
        return { tokenId, transactionHash };
    }
    async validateTicketOnChain(tokenId) {
        try {
            const result = await suiClient.getObject({
                id: tokenId,
                options: { showContent: true },
            });
            return !!result.data;
        }
        catch (error) {
            return false;
        }
    }
    async transferTicketNFT(tokenId, toAddress) {
        const tx = new transactions_1.TransactionBlock();
        tx.transferObjects([tx.object(tokenId)], tx.pure(toAddress));
        const result = await suiClient.signAndExecuteTransactionBlock({
            signer: this.keypair,
            transactionBlock: tx,
            options: { showEffects: true },
        });
        return result.digest;
    }
    async getGasEstimate(operation) {
        const gasEstimates = {
            mint_ticket: 0.001,
            transfer_ticket: 0.0005,
            deploy_contract: 0.01,
        };
        return gasEstimates[operation] || 0.001;
    }
};
exports.BlockchainService = BlockchainService;
exports.BlockchainService = BlockchainService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BlockchainService);
//# sourceMappingURL=blockchain.service.js.map