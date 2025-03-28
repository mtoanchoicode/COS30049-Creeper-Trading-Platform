const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ----- APIs for collections -----
const handleCreateCollection = async (
    contractAddress, ownerAddress, creatorAddress, collectionName, collectionSymbol, collectionDescription, collectionImage, totalSupply
    ) => {
    try {
            await fetch(`${API_BASE_URL}/v1/api/collection/created`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contractAddress: contractAddress.toString(),
                ownerAddress: ownerAddress.toString(),
                creatorAddress: creatorAddress.toString(),
                collectionName: collectionName.toString(),
                collectionSymbol: collectionSymbol.toString(),
                collectionDescription: collectionDescription.toString(),
                collectionImage: collectionImage.toString(),
                totalSupply: totalSupply.toString()
            }),
        });
    
    } catch (err) {
        console.error("Error adding collection to database:", err);
        notification.error({
        message: "Collection failed",
        description: "Error adding collection to database",
        });
    }
}

const handleGetCollection = async (contractAddress) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/api/collection/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contractAddress: contractAddress.toString()
            }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error("Error fetching collection", err);
        notification.error({
            message: "Getting collection failed",
            description: "Failed to get collection",
        });
    }
}

const handleGetAllCollections = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/api/collection/allCollections`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error("Error fetching collections", err);
        notification.error({
            message: "Getting collections failed",
            description: "Failed to get collections",
        });
    }
}

// ----- APIs for NFTs -----
const handleCreateNFT = async (
    TokenID, CollectionAddress, OwnerAddress, CreatorAddress, TokenName, TokenSymbol, TokenDescription, MetadataURI, ImageURI, Attributes
    ) => {
    try {
            await fetch(`${API_BASE_URL}/v1/api/nft/created`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                TokenID: TokenID.toString(),
                CollectionAddress: CollectionAddress.toString(),
                OwnerAddress: OwnerAddress.toString(),
                CreatorAddress: CreatorAddress.toString(),
                TokenName: TokenName.toString(),
                TokenSymbol: TokenSymbol.toString(),
                TokenDescription: TokenDescription.toString(),
                MetadataURI: MetadataURI.toString(),
                ImageURI: ImageURI.toString(),
                Attributes: Attributes.toString()
            }),
        });
    
    } catch (err) {
        console.error("Error adding NFT to database:", err);
        notification.error({
        message: "Creating NFT failed",
        description: "Error adding NFT to database",
        });
    }
}

const handleGetNFT = async (ContractAddress, TokenID) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/api/nft/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ContractAddress: ContractAddress.toString(),
                TokenID: TokenID.toString()
            }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error("Error fetching NFT", err);
        notification.error({
            message: "Getting NFT failed",
            description: "Failed to get NFT",
        });
    }
}

const handleGetAllNFTsFromCollection = async (ContractAddress) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/api/nft/allNFTsFromCollection`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ContractAddress: ContractAddress.toString()
            }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error("Error fetching NFTs", err);
        notification.error({
            message: "Getting NFTs failed",
            description: "Failed to get NFTs",
        });
    }
}

// ----- APIs for NFT Transactions -----
const handleCreateNFTTransaction = async (
    ContractAddress, TokenID, AddressFrom, AddressTo, Fee, Gas, Method, HashCode, Status
    ) => {
    try {
            await fetch(`${API_BASE_URL}/v1/api/nft_transaction/created`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ContractAddress: ContractAddress.toString(),
                TokenID: TokenID.toString(),
                AddressFrom: AddressFrom.toString(),
                AddressTo: AddressTo.toString(),
                Fee: Fee.toString(),
                Gas: Gas.toString(),
                Method: Method.toString(),
                HashCode: HashCode.toString(),
                Status: Status.toString()
            }),
        });
    
    } catch (err) {
        console.error("Error adding NFT Transaction to database:", err);
        notification.error({
        message: "Creating NFT Transaction failed",
        description: "Error adding NFT Transaction to database",
        });
    }
}

const handleGetNFTTransaction = async (HashCode) => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/api/nft_transaction/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                HashCode: HashCode.toString()
            }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error("Error fetching NFT Transaction", err);
        notification.error({
            message: "Getting NFT Transaction failed",
            description: "Failed to get NFT Transaction",
        });
    }
}

const handleGetAllNFTTransactions = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/v1/api/nft_transaction/allNFTTransactions`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error("Error fetching NFT Transactions", err);
        notification.error({
            message: "Getting NFT Transactions failed",
            description: "Failed to get NFT Transactions",
        });
    }
}

export { 
    handleCreateCollection, //create a collection
    handleGetCollection, //(contractAddress) -> collection
    handleGetAllCollections, // () -> all collections

    handleCreateNFT, //create an NFT
    handleGetNFT, //(ContractAddress, TokenID) -> NFT
    handleGetAllNFTsFromCollection, //(ContractAddress) -> all NFTs

    handleCreateNFTTransaction, //create an NFT transaction
    handleGetNFTTransaction, //(HashCode) -> NFT transaction
    handleGetAllNFTTransactions //() -> all NFT transactions
};
