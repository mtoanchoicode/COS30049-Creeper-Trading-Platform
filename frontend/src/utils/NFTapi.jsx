const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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

export default handleCreateCollection;
