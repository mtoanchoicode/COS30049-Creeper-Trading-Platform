import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import SendContainer from "../../components/Trade/SendContainer/SendContainer";
import SendWalletAddress from "../../components/Trade/SendWalletAddress/SendWalletAddress";
import { Button, notification } from "antd";
import { CoinContext } from "../../contexts/CoinContext";
import Loader from "../../components/Loader/Loader";
import GetFaucetContainer from "../../components/Trade/GetFaucetContainer/GetFaucetContainer";

const Faucet = () => {
  const CONTRACT_ADDRESS = "0xae16023db12926cD6505A0d86118e91DD5A0Eebc";
  const ABI = [
    {
      inputs: [
        { internalType: "address", name: "_lnx", type: "address" },
        { internalType: "address", name: "_cep", type: "address" },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "user",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "FaucetClaimed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "OwnerWithdrawal",
      type: "event",
    },
    {
      inputs: [],
      name: "CEP",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "LNX",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "amount",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "claim",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "claimInterval",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "lastClaim",
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
      inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
      name: "setAmount",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_interval", type: "uint256" }],
      name: "setClaimInterval",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "token", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "withdrawTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const [tokenAddress, setTokenAddress] = useState(
    "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9"
  );
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [isLoading, setIsLoading] = useState(false); // Ensure initial state is false

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    if (!isConnected) return "Connect Wallet";
    return "Get faucet";
  };

  const requestFaucet = async () => {
    if (!window.ethereum) {
      alert("MetaMask or a compatible wallet is required!");
      return;
    }

    setIsLoading(true); // Set loading to true when the transaction starts

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.claim(tokenAddress);

      notification.info({
        message: "Transaction in progress!",
        description: `Hash: ${tx.hash}`,
      });
      await tx.wait();
      notification.success({
        message: "Faucet sent!",
        description: `Hash: ${tx.hash}`,
      });
    } catch (error) {
      console.log(error.message);
      notification.success({
        message: "Transaction failed!",
        description: error.message,
      });
    } finally {
      setIsLoading(false); // Ensure loading is turned off after the transaction completes
    }
  };

  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else {
      requestFaucet();
    }
  };

  return (
    <div className="send trade-child">
      <GetFaucetContainer setTokenAddress={setTokenAddress} />
      <Button
        type="primary"
        block
        className={`send-btn trade-btn enabled`}
        onClick={handleButtonClick}
        disabled={isLoading} // Disable button while loading
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
    </div>
  );
};

export default Faucet;
