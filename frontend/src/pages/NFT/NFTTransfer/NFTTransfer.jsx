import React, { useState } from "react";
import "./NFTTransfer.css";
import { useLocation, Link } from "react-router-dom";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import { Input, Button, notification } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const NFTTransfer = () => {
  const location = useLocation();
  const nft = location.state?.nft;

  const NFT_CONTRACT_ADDRESS = nft.collectionAddress;
  const NFT_ABI = [
    "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [walletAddr, setWalletAddr] = useState("");
  const [recipient, setRecipient] = useState("");

  const transferNFT = async () => {
    if (!window.ethereum) {
      notification.error({
        message: "Wallet Required",
        description: "MetaMask or a compatible wallet is required!",
      });
      return;
    }

    setIsLoading(true);
    setIsComplete(false);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setWalletAddr(userAddress);

      const fullABI = [
        "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)",
        "function safeTransferFrom(address from, address to, uint256 tokenId, bytes data)",
      ];
      const contract = new ethers.Contract(
        NFT_CONTRACT_ADDRESS,
        fullABI,
        signer
      );

      // Check sender's balance
      const balance = await provider.getBalance(userAddress);
      const gasEstimate = await contract.safeTransferFrom.estimateGas(
        userAddress,
        recipient,
        nft.id,
        "0x"
      );

      const { gasPrice } = await provider.getFeeData();
      const gasCost = gasEstimate * gasPrice;

      console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
      console.log(`Estimated Gas Cost: ${ethers.formatEther(gasCost)} ETH`);

      if (balance < gasCost) {
        notification.error({
          message: "Insufficient Balance",
          description: "You do not have enough ETH to cover the gas fees.",
        });
        return;
      }
      console.log(
        `Transferring NFT ID ${nft.id} from ${userAddress} to ${recipient}...`
      );

      setIsSigning(true);

      const tx = await contract.safeTransferFrom(
        userAddress,
        recipient,
        nft.id,
        "0x"
      );
      console.log("Transaction sent! Waiting for confirmation...");

      setIsSigning(false);

      await tx.wait();
      setTransactionId(tx.hash);
      console.log(
        `✅ NFT successfully transferred! Transaction Hash: ${tx.hash}`
      );

      setIsComplete(true);
      notification.success({
        message: "Transfer Successful",
        description: `${nft.name} successfully transferred to ${recipient}.`,
      });
    } catch (error) {
      console.error("Transfer failed:", error);

      let errorMessage = "Transaction Failed. Please try again.";

      // Check if the error contains "execution reverted"
      if (error.message.includes("execution reverted")) {
        errorMessage =
          "Execution reverted. Please reach out to the collection owner to troubleshoot.";
      }

      notification.error({
        message: "Transaction Failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false); // Ensure loading state resets
    }
  };

  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else if (recipient) {
      transferNFT();
    }
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect Wallet";
    if (!recipient) return "Enter Address";
    if (isComplete) return "Transfer Complete"; // Show success state
    if (isLoading) return "Transferring...";
    return "Transfer";
  };

  const handleInputChange = (e) => {
    setRecipient(e.target.value);
  };

  const shortenAddress = (address) => {
    return `${address.slice(0, 9)}...${address.slice(-4)}`;
  };

  return (
    <div className="nft-transfer">
      <h1 className="nft-transfer-title">Transfer</h1>
      <div className="nft-transfer-cover">
        <img src={nft.image} alt={nft.name} />
      </div>
      <div className="nft-transfer-input">
        <p>{`Transfer "${nft.name}" to:`}</p>
        <Input
          placeholder="e.g. 0x1ed3... or destination.eth, destination.lens"
          onChange={handleInputChange}
        />
      </div>
      <Button
        type="primary"
        block
        loading={isLoading}
        onClick={handleButtonClick}
        disabled={isLoading}
        className={`swap-btn trade-btn ${
          isConnected && !recipient ? "disabled" : "enabled"
        }`}
      >
        {getButtonText()}
      </Button>
      {isSigning && (
        <div className="nft-signing-overlay nft-overlay">
          <div className="nft-signing-overlay-container nft-overlay-container">
            <div className="nft-signing-overlay-container-title">
              <h2>Transferring your item</h2>
              <CloseOutlined onClick={() => setIsSigning(false)} />
            </div>
            <div className="nft-signing-overlay-container-desc">
              <p>Go to your wallet</p>
              <p>You'll be asked to approve this transfer from your wallet.</p>
            </div>
          </div>
        </div>
      )}
      {isComplete && (
        <div className="nft-complete-overlay nft-overlay">
          <div className="nft-complete-overlay-container nft-overlay-container">
            <div className="nft-complete-overlay-container-icon">
              <CloseOutlined onClick={() => setIsComplete(false)} />
            </div>
            <div className="nft-complete-overlay-container-cover">
              <img src={nft.image} alt={nft.name} />
            </div>
            <div className="nft-complete-overlay-container-text">
              <h2>Your transferred is complete!</h2>
              <p>
                You transfer{" "}
                <Link to={`/nft/${nft.collectionAddress}`}>{nft.name}</Link>.
              </p>
            </div>
            <div className="nft-complete-overlay-container-hash">
              <p>TRANSACTION ID</p>
              <a
                h
                href={`https://sepolia.etherscan.io/tx/${transactionId}`}
                target="blank"
              >
                {shortenAddress(transactionId)}
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTTransfer;