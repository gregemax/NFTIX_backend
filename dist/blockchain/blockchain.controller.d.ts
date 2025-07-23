import { BlockchainService } from "./blockchain.service";
export declare class BlockchainController {
    private blockchainService;
    constructor(blockchainService: BlockchainService);
    deployContract(eventData: any): Promise<string>;
    mintTicket(ticketData: any): Promise<{
        tokenId: string;
        transactionHash: string;
    }>;
    validateTicket(tokenId: string): Promise<boolean>;
    transferTicket(transferData: {
        tokenId: string;
        fromAddress: string;
        toAddress: string;
    }): Promise<string>;
    getGasEstimate(operation: string): Promise<number>;
}
