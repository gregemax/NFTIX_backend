export declare class BlockchainService {
    private readonly keypair;
    private readonly packageId;
    constructor();
    deployEventContract(eventData: any): Promise<string>;
    mintTicketNFT(ticketData: {
        eventId: string;
        recipient: string;
        metadataUri: string;
    }): Promise<{
        tokenId: string;
        transactionHash: string;
    }>;
    validateTicketOnChain(tokenId: string): Promise<boolean>;
    transferTicketNFT(tokenId: string, toAddress: string): Promise<string>;
    getGasEstimate(operation: string): Promise<number>;
}
