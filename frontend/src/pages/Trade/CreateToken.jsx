import React, { useState } from "react";

import { ExportOutlined } from "@ant-design/icons";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Button, Modal, notification } from "antd";
import CreateTokenContainer from "../../components/Trade/CreateTokenContainer/CreateTokenContainer";
import { ethers } from "ethers";
import Loader from "../../components/Loader/Loader";
import "./Trade.css";

const shortenAddress = (address) => {
  return `${address.slice(0, 17)}...${address.slice(-4)}`;
};

const CreateToken = () => {
  const CONTRACT_ADDRESS = "0x95D4BFdCb6CDcEfFb4A4E4Cfd3dd72E8f8b7C932";
  const ABI = [
    {
      inputs: [
        { internalType: "uint256", name: "initialFee", type: "uint256" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "newFee",
          type: "uint256",
        },
      ],
      name: "FeeUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenAddress",
          type: "address",
        },
        {
          indexed: false,
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          indexed: false,
          internalType: "string",
          name: "symbol",
          type: "string",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "supply",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "creator",
          type: "address",
        },
      ],
      name: "TokenCreated",
      type: "event",
    },
    {
      inputs: [
        { internalType: "string", name: "name", type: "string" },
        { internalType: "string", name: "symbol", type: "string" },
        { internalType: "uint256", name: "supply", type: "uint256" },
      ],
      name: "createToken",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [],
      name: "getBalance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "tokenCreationFee",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "newFee", type: "uint256" }],
      name: "updateFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const { isConnected } = useAppKitAccount();
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (address) => {
    navigator.clipboard.writeText(address);
    setCopied(address);

    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(null), 1000);
  };

  const { open } = useAppKit();
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [createdTokenAddress, setCreatedTokenAddress] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [creationFee, setCreationFee] = useState("0.001");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleCreateToken = async () => {
    if (!window.ethereum) {
      notification.error({
        message: "Wallet Not Detected",
        description: "MetaMask or a compatible wallet is required!",
      });
      return;
    }

    if (!tokenName || !tokenSymbol || !totalSupply) {
      notification.error({
        message: "Invalid Input",
        description: "Please fill in all fields!",
      });
      return;
    }

    if (Number(totalSupply) < 100) {
      notification.error({
        message: "Invalid Total Supply",
        description: "Total supply must be at least 100!",
      });
      return;
    }

    setCreatedTokenAddress(null);
    setIsLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.createToken(
        tokenName,
        tokenSymbol,
        totalSupply,
        {
          value: ethers.parseEther(creationFee),
        }
      );

      notification.info({
        message: "Token creation in progress!",
        description: `Transaction Hash: ${tx.hash}`,
      });

      const receipt = await tx.wait();

      // Extract token address from the event logs
      const event = receipt.logs.find(
        (log) => log.address === CONTRACT_ADDRESS
      );
      if (event) {
        const iface = new ethers.Interface(ABI);
        const decodedLog = iface.parseLog(event);
        const newTokenAddress = decodedLog.args.tokenAddress;
        setCreatedTokenAddress(newTokenAddress);

        notification.success({
          message: "Token Created Successfully!",
          description: `Token Address: ${newTokenAddress}`,
        });

        // Show modal with token details
        setIsModalVisible(true);
      } else {
        notification.warning({
          message: "Token Created, but Address Not Found",
        });
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Token Creation Failed!",
        description: error.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else if (tokenName && tokenSymbol && totalSupply) {
      console.log("hi", ethers.parseEther(creationFee));
      handleCreateToken();
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    if (!isConnected) return "Connect Wallet";
    if (!tokenName) return "Enter token name";
    if (!tokenSymbol) return "Enter token symbol";
    if (!totalSupply) return "Enter total supply";
    return `Create ${tokenName} Token`;
  };

  return (
    <div className="create trade-child">
      <div className="trade-main">
        <CreateTokenContainer
          setTokenName={setTokenName}
          setTokenSymbol={setTokenSymbol}
          setTotalSupply={setTotalSupply}
        />
        <Button
          type="primary"
          block
          className={`swap-btn trade-btn ${
            isLoading ||
            !tokenName ||
            !tokenSymbol ||
            !totalSupply ||
            totalSupply < 100
              ? "disabled"
              : "enabled"
          }`}
          onClick={handleButtonClick}
        >
          {isLoading ? (
            <div className="send-btn-content">
              <Loader />
              <span>Sending...</span>
            </div>
          ) : (
            getButtonText()
          )}
        </Button>
        <a
          className="trade-contractAddress"
          href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
          target="_blank"
        >
          <span>Contract address</span>
          <ExportOutlined />
        </a>
      </div>
      {/* Modal to display token details */}
      <Modal
        title="Token Created Successfully"
        // open={isModalVisible}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
        ]}
        className="custom-modal"
      >
        <p style={{ display: "inline-block" }}>
          <strong>Token Address:</strong>{" "}
          <a
            href={`https://sepolia.etherscan.io/address/${createdTokenAddress}`}
            target="_blank"
          >
            {createdTokenAddress ? shortenAddress(createdTokenAddress) : ""}
          </a>
        </p>
        <div
          className="copy-btn"
          style={{ display: "inline-block", marginLeft: "1rem" }}
          onClick={() => copyToClipboard(createdTokenAddress)}
        >
          {copied === createdTokenAddress ? (
            <i className="fa-solid fa-check"></i>
          ) : (
            <i className="fa-solid fa-copy"></i>
          )}
        </div>
        <p>
          <strong>Token Name:</strong> {tokenName}
        </p>
        <p>
          <strong>Token Symbol:</strong> {tokenSymbol}
        </p>
      </Modal>
    </div>
  );
};

export default CreateToken;
