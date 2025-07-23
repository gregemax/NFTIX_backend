export declare class BlockchainService {
    deployEventContract(eventData: any): Promise<string>;
    mintTicketNFT(ticketData: any): Promise<{
        tokenId: string;
        transactionHash: string;
    }>;
    validateTicketOnChain(tokenId: string): Promise<boolean>;
    transferTicketNFT(tokenId: string, fromAddress: string, toAddress: string): Promise<string>;
    getGasEstimate(operation: string): Promise<number>;
}
