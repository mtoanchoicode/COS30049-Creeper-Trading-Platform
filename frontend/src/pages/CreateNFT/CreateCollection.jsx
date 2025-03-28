import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./CreateCollection.css";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Button, Form, Input, Upload, Image, Radio, Alert, notification, Popover  } from "antd";
import { UploadOutlined, PictureOutlined, InfoCircleOutlined, ExportOutlined} from "@ant-design/icons";
import NFTABI from "../../../../smart-contracts/artifacts/contracts/NFTCollection.sol/NFTCollection.json";   
import { ethers } from "ethers";


const CreateCollection = () => {

    //cotarct state
    const { open } = useAppKit();

    //font-end states
    const [fileList, setFileList] = useState([]);
    const [hovered, setHovered] = useState(false);
    const isUpload = fileList && fileList.length > 0;
    const [blockchain, setBlockchain] = useState("sepolia");
    const [visible, setVisible] = useState({
        logo: false,
        contract: false,
        symbol: false,
        blockchain: false,
        upload: false,
    });
    const [deployedContract, setDeployedContract] = useState(null);


    const handleSubmit = async (values) => {
        if (!window.ethereum) {
            notification.error({ message: "MetaMask not found", description: "Please install MetaMask to deploy your contract." });
            return;
        }

        try {
            // Get provider and signer
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner(); // Get the user's wallet address

            const bytecode = NFTABI.bytecode;
            
            if (!bytecode) {
                throw new Error("Contract bytecode is missing. Ensure the ABI JSON includes the bytecode.");
            }
    
            //const NFTCollection = new ethers.ContractFactory("NFTCollection");
            // Contract factory
            const NFTCollection = new ethers.ContractFactory(NFTABI.abi, bytecode, signer);

              // Deploy contract with user input
            const nftCollection = await NFTCollection.deploy(values.collectionName, values.collectionSymbol);
            await nftCollection.waitForDeployment();

            const contractAddress = await nftCollection.getAddress();
            setDeployedContract(contractAddress); // Set the deployed contract address in state
            setVisible(true);

            console.log(`NFTCollection deployed to: ${await nftCollection.getAddress()}`);
            notification.success({ 
                message: "Contract Deployed!", 
                description: `Address: ${contractAddress}` });


            //const { collectionName, collectionSymbol } = values;
            // Call the backend API to deploy the contract
            // const response = await fetch("http://localhost:3000/v1/api/nft/collection/deploy", {
            //     method: "POST",
            //     headers: { "Content-Type": "application/json" },
            //     body: JSON.stringify({ collectionName, collectionSymbol }),
            // });
    
            // const data = await response.json();
            // if (data.success) {
            //     notification.success({
            //         message: "Success",
            //         description: `NFT Collection deployed to: ${data.contractAddress}`,
            //     });
            // } else {
            //     notification.error({
            //         message: "Deployment Failed",
            //         description: data.error || "Something went wrong.",
            //     });
            // }
        } catch (error) {
            console.error(error.message);
            notification.error({
                message: "Error",
                description: `Failed to deploy contract !`,
            });
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

    // Handle Blockchain Selection
    const handleBlockchainChange = (e) => {
        const selectedValue = e.target.value;
        if (selectedValue === "base sepolia") {
            notification.warning({
                message: "Selection Restricted",
                description: "Base Sepolia is not supported yet. Please select another!",
            });
          
            return;
        }
       
        setBlockchain(selectedValue);
    };

    

    return (
        <section className="create-collection">
            <div className="create-collection__container">
                <div className="create-collection__header">
                    <h2>First, you’ll need to create a collection for your NFT</h2>
                    <p>You’ll need to deploy an ERC-721 contract on the blockchain to create a collection for your NFT.
                        <a href="https://opensea.io/learn/blockchain/what-is-a-smart-contract"> What is a contract?</a>
                    </p>
                </div>


                {deployedContract && (
                    <Popover 
                        content={
                            <div>
                                <p>
                                    <a 
                                        href={`https://sepolia.etherscan.io/address/${deployedContract}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        View in EtherScan: <ExportOutlined/>
                                    </a>
                                </p>
                                <a style={{color: "var(--primary-color)"}} onClick={() => hidePop("upload")}>Close</a>
                            </div>
                        }
                        title="Deployment Details"
                        trigger="click"
                        open={visible.upload}
                        onOpenChange={(newOpen) => handleOpenPopChange("upload", newOpen)}
                    >
                        <Button className="collection_button-deploy-info" type="primary" icon={<InfoCircleOutlined />}>
                            View Deployment Info
                        </Button>
                    </Popover>
                )}

                <div className="create-collection__form-container">
                    <Form
                        onFinish={handleSubmit}
                        className="create-collection__form">
                        <div className="collection__form-header">
                            <h4>Logo Image</h4>                       
                            <Popover 
                                content={
                                    <>
                                    <p>Your logo should be a representation of your items and will appear next to your collection name throughout Creaper.</p>
                                    <a style={{color: "var(--primary-color)"}} onClick={() => hidePop("logo")}>Close</a>
                                    </>
                                } 
                                title="Logo Image"
                                trigger="click"
                                open={visible.logo}
                                onOpenChange={(newOpen) => handleOpenPopChange("logo", newOpen)}>
                                <Button type="primary" shape="circle" icon={<InfoCircleOutlined />} size={"small"} ></Button>
                            </Popover>
                        </div>

                        <div className="collection__image-conatainer"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}>
                            <Form.Item
                                name="CollectionImage"
                                rules={[{ required: true, message: "Please upload your collection image!" }]}
                            >
                                <Upload
                                    className="collection__upload"
                                    accept="image/*"
                                    //showUploadList={true}
                                    beforeUpload={() => false} // Prevent auto-upload
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture"
                                    fileList={fileList}
                                    onChange={handleChange}
                                    onPreview={handlePreview}
                                    onRemove={handleRemove}
                                    maxCount={1}
                                >

                                    {!isUpload && (
                                        <div
                                            className="create-Image__detials">
                                            <div className="create-Image__icons">
                                                <span className={`icon ${hovered ? "slide-down" : "slide-up"}`}>
                                                    <PictureOutlined />
                                                </span>
                                                <span className={`icon ${hovered ? "slide-up" : "slide-down"}`}>
                                                    <UploadOutlined />
                                                </span>
                                            </div>
                                            <div className="create-Image__text">
                                                <h4>Drag and drop or click to upload</h4>
                                                <p>Recommended type: JPD, PNG, SVG, or GIF</p>
                                            </div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </div>

                        <div className="collection__details-container">
                            <div className="collection__details">
                                <div className="collection__form-header">
                                    <h4>Contract Name</h4>
                                    <Popover 
                                        content={
                                            <>
                                            <p>The contract name is the name of your NFT collection, which is visible on chain. This is usually your project or collection name.</p>
                                            <a style={{color: "var(--primary-color)"}} onClick={() => hidePop("contract")}>Close</a>
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
                                    name="collectionName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input collection name!",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="collection__input"
                                        placeholder="My Collection Name" />
                                </Form.Item>
                            </div>

                            <div className="collection__details">
                                <div className="collection__form-header">
                                    <h4>Token symbol</h4>
                                    <Popover 
                                        content={
                                            <>
                                            <p>The token symbol is the shorthand way to identify your contract, which is visible on chain.</p>
                                            <a style={{color: "var(--primary-color)"}} onClick={() => hidePop("symbol")}>Close</a>
                                            </>
                                        } 
                                        title="Token Symbol"
                                        trigger="click"
                                        open={visible.symbol}
                                        onOpenChange={(newOpen) => handleOpenPopChange("symbol", newOpen)}>
                                        <Button type="primary" shape="circle" icon={<InfoCircleOutlined />} size={"small"} ></Button>
                                    </Popover>
                                </div>

                                <Form.Item
                                    name="collectionSymbol"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input collection symbol!",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="collection__input"
                                        placeholder="MCN" />
                                </Form.Item>
                            </div>
                        </div>

                        <div className="collection__form-header">
                            <h4>Block Chain</h4>
                            <Popover 
                                content={
                                    <>
                                      <p>A blockchain is a digitally distributed ledger that records transactions and information across a decentralized network.</p>
                                      <a style={{color: "var(--primary-color)"}} onClick={() => hidePop("blockchain")}>Close</a>
                                    </>
                                } 
                                title="Blockchain" 
                                trigger="click"
                                open={visible.blockchain}
                                onOpenChange={(newOpen) => handleOpenPopChange("blockchain", newOpen)}>
                                <Button type="primary" shape="circle" icon={<InfoCircleOutlined />} size={"small"} ></Button>
                            </Popover>
                        </div>
         
                        <Form.Item name="blockchain" initialValue={"sepolia"}>
                            <Radio.Group 
                                className="collection__blockchain-container" 
                                value={blockchain} 
                                defaultValue="sepolia" 
                                onChange={handleBlockchainChange}>
                                <Radio.Button value="sepolia" className="collection__blockchain">
                                    <div className="collection__blockchain-content-container">
                                        <div className="collection__blockchain-header">
                                            <img src="https://opensea.io/static/images/logos/ethereum.svg" alt="Sepolia icon" />
                                            <h4>Sepolia</h4>
                                        </div>
                                        <div className="collection__blockchain-content">
                                            <span>Most popular</span>
                                            <p>Estimated cost to deploy contract:</p>
                                        </div>
                                    </div>
                                </Radio.Button> 


                                <Radio.Button value="base sepolia" className="collection__blockchain">
                                    <div className="collection__blockchain-content-container">
                                        <div className="collection__blockchain-header">
                                            <img src="https://opensea.io/static/images/logos/base.svg" alt=" Base Sepolia icon" />
                                            <h4>Base Sepolia</h4>
                                        </div>
                                        <div className="collection__blockchain-content">
                                            <span>Cheaper</span>
                                            <p>Estimated cost to deploy contract:</p>
                                        </div>
                                    </div>
                                </Radio.Button> 
                            </Radio.Group>
                        </Form.Item>
                        
                        <Form.Item>
                            <Button className="collection__button-submit" type="primary" htmlType="submit">
                                Create Collection
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
    )
};

export default CreateCollection;

