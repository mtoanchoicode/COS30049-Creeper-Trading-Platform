import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CreateNFT.css";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Button, Form, Input, Upload, Image, Alert, notification, Popover, Spin, Select } from "antd";
import { UploadOutlined, PlusCircleOutlined, InfoCircleOutlined, ExportOutlined, LoadingOutlined, DeleteOutlined } from "@ant-design/icons";
import NFTABI from "../../../../smart-contracts/artifacts/contracts/NFTCollection.sol/NFTCollection.json";
import { ethers } from "ethers";
import { handleGetAllCollections } from "../../utils/NFTapi";


const CreateNFT = () => {

    const [fileList, setFileList] = useState([]);
    const { address, isConnected } = useAppKitAccount();
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingbtn, setIsLoadingbtn] = useState(false);
    const [hovered, setHovered] = useState(false);
    const isUpload = fileList && fileList.length > 0;
    const [visible, setVisible] = useState({
        collection: false,
        contract: false,
        description: false,
        upload: false,
    });
    const [collections, setCollections] = useState([]);
    const [collectionsDB, setCollectionsDB] = useState([]);
    const [deployedContract, setDeployedContract] = useState(null);
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const collecionData = async () => {
            try {
                setIsLoading(true);

                const nftDB = await handleGetAllCollections()
                console.log("NFTDB", nftDB);


                const nftResponse = await fetch(
                    `${API_BASE_URL}/v1/api/nft-search/${address}`,
                    {
                        method: "GET",
                    }
                );

                if (!nftResponse.ok) {
                    throw new Error(`Error fetching NFT data: ${nftResponse.statusText}`);
                }

                const nftData = await nftResponse.json();

                // nft.address
                const NFT_ABI = [
                    "function name() view returns (string)",
                    "function symbol() view returns (string)",
                    "function owner() view returns (address)",
                    "function totalSupply() view returns (uint256)", // Only available if contract implements it
                    "function tokenURI(uint256 tokenId) view returns (string)",
                    "function ownerOf(uint256 tokenId) view returns (address)",
                    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
                ];

                // Format minted collections from the API

                const formattedCollections = nftData.nfts.map((nft) => ({
                    value: nft.contractAddress, // Using contractAddress as value
                    label: nft.collection.name, // Using collection.name as label
                    data: {
                        name: nft.collection.name,
                        symbol: nft.collection.symbol,
                        tokenType: nft.collection.tokenType,
                        contractAddress: nft.contractAddress
                    }
                }));


                let unmintedCollections = [];
                if (nftDB) {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();

                    unmintedCollections = await Promise.all(
                        nftDB.map(async (nft) => {
                            try {
                                const contract = new ethers.Contract(nft.ContractAddress, NFT_ABI, provider);
                                const contractOwner = await contract.owner();
                                const collectionSymbol = await contract.symbol();

                                console.log(`Checking contract ${nft.ContractAddress}, owner: ${contractOwner}, symbol : ${collectionSymbol}`);

                                if (contractOwner === signer.address && collectionSymbol) {
                                    return {
                                        value: nft.ContractAddress,
                                        label: nft.CollectionName,
                                        data: {
                                            name: nft.CollectionName,
                                            symbol: collectionSymbol, // Placeholder for unminted
                                            tokenType: "ERC7721",
                                            contractAddress: nft.ContractAddress
                                        }
                                    };
                                }
                            } catch (error) {
                                console.error(`Failed to get contract owner for ${nft.ContractAddress}:`, error);
                            }
                            return null;
                        })
                    );
                    // Remove `null` values from failed owner fetches
                    unmintedCollections = unmintedCollections.filter(Boolean);
                }

                // ✅ Merge minted and unminted collections, removing duplicates
                const combinedCollections = [...formattedCollections, ...unmintedCollections];
                // Remove duplicates based on contractAddress
                const uniqueCollections = Array.from(
                    new Map(combinedCollections.map(item => [item.value, item])).values()
                );

                setCollections(uniqueCollections);
                console.log(uniqueCollections);

            } catch (err) {
                // setError(err.message || "Something went wrong!");
                notification.error({
                    message: "Error",
                    description: err.message || "Something went wrong!",
                });
            } finally {
                setIsLoading(false);
            }
        };

        if (isConnected) {
            collecionData();
        }

    }, [isConnected, address, API_BASE_URL]);



    const handleSubmit = async (values) => {
        if (!window.ethereum) {
            notification.error({ message: "MetaMask not found", description: "Please install MetaMask to deploy your contract." });
            return;
        }

        if (!fileList.length) {
            notification.error({ message: "Error", description: "Please upload an image for the NFT!" });
            return;
        }

        setIsLoadingbtn(true);
        const formData = new FormData();
        const file = fileList[0].originFileObj;
        formData.append("file", file);
        formData.append("name", values.NFTName);
        formData.append("description", values.NFTDescription || "No description provided");

        try {
            const Response = await fetch(`${API_BASE_URL}/v1/api/nft/create/deploy`, {
                method: "POST",
                body: formData,
            });

            if (!Response.ok) {
                throw new Error("Failed to upload NFT");
            }

            const { data } = await Response.json();

            console.log("Metadata URI:", data.metadataURI);

            // Get provider and signer
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner(); // Get the user's wallet address
            const contractCollection = new ethers.Contract(values.Collection, NFTABI.abi, signer);

            const tx = await contractCollection.mint(data.metadataURI);

            notification.info({
                message: "Transaction in progress!",
                description: `Hash: ${tx.hash}`,
            });
            await tx.wait();

            const NFTAddress = await contractCollection.getAddress();
            setVisible(true);
            setDeployedContract(NFTAddress);

            notification.success({
                message: "Successfully create new NFT !",
                description: `Address: ${NFTAddress}`
            });

        } catch (error) {
            console.error(error.message);
            notification.error({ message: "Error", description: "Something went wrong !" });
            return;
        }

        finally {
            setIsLoadingbtn(false);
        }
    };


    const hidePop = (key) => {
        setVisible(prev => ({ ...prev, [key]: false }));
    };


    const handleOpenPopChange = (key, newOpen) => {
        setVisible(prev => ({ ...prev, [key]: newOpen }));
    };


    // Handle File Upload Changes
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList); // Update fileList state
    };

    // Handle File Removal
    const handleRemove = (file) => {
        setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    };

    // Handle File Preview
    const handlePreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.body.appendChild(image.outerHTML);
    };

    // // Handle Blockchain Selection
    // const handleBlockchainChange = (e) => {
    //     const selectedValue = e.target.value;
    //     if (selectedValue === "base sepolia") {
    //         notification.warning({
    //             message: "Selection Restricted",
    //             description: "Base Sepolia is not supported yet. Please select another!",
    //         });

    //         return;
    //     }

    //     setBlockchain(selectedValue);
    // };



    return (
        <section className="create-NFT">
            <div className="create-NFT__container">
                <div className="create-NFT__header">
                    <h1>Create an NFT</h1>
                    <p>Once your item is minted you will not be able to change any of its information.</p>
                </div>


                {deployedContract && (
                    <>
                        <Alert
                            message="Success created NFT!"
                            type="success"
                            showIcon
                            closable
                            style={{ marginBottom: "1.2rem", width: "50%" }}
                        />
                        <Popover
                            content={
                                <div>
                                    <p>
                                        <a
                                            href={`https://sepolia.etherscan.io/address/${deployedContract}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            View in EtherScan: <ExportOutlined />
                                        </a>
                                    </p>
                                    <a style={{ color: "var(--primary-color)" }} onClick={() => hidePop("upload")}>Close</a>
                                </div>
                            }
                            title="Created NFT Details"
                            trigger="click"
                            open={visible.upload}
                            onOpenChange={(newOpen) => handleOpenPopChange("upload", newOpen)}
                        >
                            <Button className="NFT-button NFT_button-deploy-info" type="primary" icon={<InfoCircleOutlined />}>
                                View Deployment Info
                            </Button>
                        </Popover>
                    </>
                )}

                <div className="create-NFT__form-container">
                    <Form
                        onFinish={handleSubmit}
                        className="create-NFT__form">
                        <div className="NFT__leftside">
                            <div className="NFT__image-conatainer"
                                onMouseEnter={() => setHovered(true)}
                                onMouseLeave={() => setHovered(false)}>
                                <Form.Item
                                    name="NFTImage"
                                    rules={[{ required: true, message: "Please upload your NFT image!" }]}
                                >
                                    <Upload
                                        className="NFT__upload"
                                        accept="image/*"
                                        //showUploadList={true}
                                        beforeUpload={() => false} // Prevent auto-upload
                                        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={handleChange}
                                        onPreview={handlePreview}
                                        onRemove={handleRemove}
                                        maxCount={1}
                                        itemRender={(originNode, file) => (
                                            <div className="custom-upload-preview">
                                                <div className="ant-upload-list-item-container NFT_image-container">
                                                    <img
                                                        src={URL.createObjectURL(file.originFileObj)}
                                                        alt={file.name}
                                                        className="NFT_preview-image"
                                                    />
                                                    <div className="hover-overlay">
                                                        <Button
                                                            icon={<DeleteOutlined />}
                                                            shape="circle"
                                                            danger
                                                            onClick={() => handleRemove(file)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    >

                                        {!isUpload && (
                                            <div
                                                className="create-Image-NFT__detials">
                                                <div className="create-Image__text">
                                                    <UploadOutlined />
                                                    <h4>Drag and drop media</h4>
                                                    <p style={{ color: "var(--primary-color)" }}>Browse File</p>
                                                    <p>Max size: 50MB</p>
                                                    <p>Type: JPD, PNG, SVG, or GIF</p>
                                                </div>
                                            </div>
                                        )}
                                    </Upload>
                                </Form.Item>
                            </div>
                        </div>


                        <div className="NFT__rightside">
                            <div className="NFT__form-header">
                                <h4>Collecion</h4>
                                <Popover
                                    content={
                                        <>
                                            <p>A Collection of your address will hold all the item of NFT created</p>
                                            <a style={{ color: "var(--primary-color)" }} onClick={() => hidePop("collection")}>Close</a>
                                        </>
                                    }
                                    title="Collection"
                                    trigger="click"
                                    open={visible.collection}
                                    onOpenChange={(newOpen) => handleOpenPopChange("collection", newOpen)}>
                                    <Button type="primary" shape="circle" icon={<InfoCircleOutlined />} size={"small"} ></Button>
                                </Popover>
                            </div>

                            {isLoading ? (
                                <Spin indicator={<LoadingOutlined spin />} size="large" />
                            ) : collections.length > 0 ? (
                                <Form.Item
                                    name="Collection"
                                    rules={[{ required: true, message: "Please select a collection!" }]}
                                >
                                    <Select
                                        className="NFT__select-collection"
                                        fieldNames={{ label: "label", value: "value" }} // Ensure correct mapping
                                        options={collections}
                                        placeholder="Choose the collection"
                                        dropdownRender={menu => (
                                            <>
                                                {menu}
                                                <div
                                                    style={{ display: "flex", alignItems: "center", padding: "8px", cursor: "pointer" }}
                                                    onMouseDown={(e) => e.preventDefault()} // Prevents closing on click
                                                >
                                                    <PlusCircleOutlined />
                                                    <Link style={{ marginLeft: "0.7rem", width: "100%" }} to="/create/collection">
                                                        Create a Collection
                                                    </Link>
                                                </div>
                                            </>
                                        )}
                                    />
                                </Form.Item>
                            ) : (
                                <Button type="primary" className="NFT-button NFT-button_create_collection">
                                    <Link to="/create/collection">Create a Collection</Link>
                                </Button>
                            )}



                            <div className="NFT__details-container">
                                <div className="NFT__details">
                                    <div className="NFT__form-header">
                                        <h4>Name *</h4>
                                        <Popover
                                            content={
                                                <>
                                                    <p>The is the name of your NFT, which is visible on chain. This is usually your project or NFT name.</p>
                                                    <a style={{ color: "var(--primary-color)" }} onClick={() => hidePop("contract")}>Close</a>
                                                </>
                                            }
                                            title="Contract Name"
                                            trigger="click"
                                            open={visible.contract}
                                            onOpenChange={(newOpen) => handleOpenPopChange("contract", newOpen)}>
                                            <Button type="primary" shape="circle" icon={<InfoCircleOutlined />} size={"small"} ></Button>
                                        </Popover>
                                    </div>

                                    <Form.Item
                                        name="NFTName"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please input NFT name!",
                                            },
                                        ]}
                                    >
                                        <Input
                                            className="NFT__input"
                                            placeholder="Enter the NFT name" />
                                    </Form.Item>
                                </div>

                                <div className="NFT__details">
                                    <div className="NFT__form-header">
                                        <h4>Description</h4>
                                        <Popover
                                            content={
                                                <>
                                                    <p>The description for the NFT which will be the metadata for NFT with Name and Image</p>
                                                    <a style={{ color: "var(--primary-color)" }} onClick={() => hidePop("description")}>Close</a>
                                                </>
                                            }
                                            title="Description"
                                            trigger="click"
                                            open={visible.description}
                                            onOpenChange={(newOpen) => handleOpenPopChange("description", newOpen)}>
                                            <Button type="primary" shape="circle" icon={<InfoCircleOutlined />} size={"small"} ></Button>
                                        </Popover>
                                    </div>

                                    <Form.Item
                                        name="NFTDescription"
                                    >
                                        <Input.TextArea
                                            className="NFT__input"
                                            placeholder="Enter the description"
                                            rows={5} // Adjust the number of rows as needed
                                            autoSize={{ minRows: 3, maxRows: 9 }}
                                        />

                                    </Form.Item>
                                </div>
                            </div>

                            <Form.Item>
                                <Button className="NFT-button NFT__button-submit" type="primary" htmlType="submit">
                                    {isLoadingbtn ?
                                        <span>
                                            <Spin indicator={<LoadingOutlined spin />} size="small" />
                                            <p>Deploying...</p>
                                        </span>
                                        : "Create NFT"}
                                </Button>
                            </Form.Item>
                        </div>
                    </Form>
                </div>
            </div>
        </section>
    )
};

export default CreateNFT;

