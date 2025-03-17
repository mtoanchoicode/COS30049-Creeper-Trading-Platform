import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import SendContainer from "../../components/Trade/SendContainer/SendContainer";
import SendWalletAddress from "../../components/Trade/SendWalletAddress/SendWalletAddress";
import { Button, notification } from "antd";
import { CoinContext } from "../../contexts/CoinContext";
import Loader from "../../components/Loader/Loader";
import GetFaucetContainer from "../../components/Trade/GetFaucetContainer/GetFaucetContainer";
import { ExportOutlined } from "@ant-design/icons";
import handleTransaction from "../../utils/transactionAPI";
import TransactionHistory from "../../components/Trade/TransactionHistory/TransactionHistory";

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
  const [lastClaimText, setLastClaimText] = useState("");
  const [userAddress, setuserAddress] = useState("");
  const [txAdress, settxAdress] = useState("");

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    if (!isConnected) return "Connect Wallet";
    return "Get faucet";
  };

  // Function to fetch and update the last claim time
  const fetchLastClaimTime = async () => {
    if (!window.ethereum) return;

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const userAddress = await signer.getAddress();
      setuserAddress(userAddress);
      const lastClaimTimestamp = await contract.lastClaim(userAddress);

      // Convert BigNumber to a JavaScript number
      const lastClaimTime = Number(lastClaimTimestamp);

      if (lastClaimTime <= 0) {
        setLastClaimText("No claim history");
        return;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      const elapsedTime = currentTime - lastClaimTime;

      if (elapsedTime < 0) {
        setLastClaimText("Fetching last claim...");
        return;
      }

      const hours = Math.floor(elapsedTime / 3600);
      const minutes = Math.floor((elapsedTime % 3600) / 60);
      setLastClaimText(`Last claim: ${hours}h ${minutes}m ago`);
    } catch (error) {
      console.error("Error fetching last claim time:", error);
    }
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

      settxAdress(tx.hash);
      const receipt = await tx.wait();
      notification.success({
        message: "Faucet sent!",
        description: `Hash: ${tx.hash}`,
      });

      const gasUsed = receipt.gasUsed;

      await handleTransaction(
        userAddress,
        tokenAddress,
        userAddress,
        100,
        0,
        gasUsed,
        "Faucet",
        tx.hash,
        "Success"
      );
    } catch (error) {
      console.log(error.message);
      notification.error({
        message: "Transaction failed!",
        description: "Wait for faucet cooling down",
      });
      await handleTransaction(
        userAddress,
        tokenAddress,
        userAddress,
        100,
        0,
        0,
        "Faucet",
        txAdress,
        "Failed"
      );
    } finally {
      setIsLoading(false); // Ensure loading is turned off after the transaction completes
      fetchLastClaimTime();
    }
  };

  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else {
      requestFaucet();
    }
  };

  useEffect(() => {
    if (isConnected) {
      fetchLastClaimTime();
    } else {
      setLastClaimText("");
    }
  }, [isConnected]);

  return (
    <div className="send trade-child">
      <div className="trade-main">
        <GetFaucetContainer setTokenAddress={setTokenAddress} />
        <p
          style={{
            textAlign: "center",
            marginTop: "10px",
          }}
        >
          {lastClaimText}
        </p>
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
        <a
          className="trade-contractAddress"
          href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
          target="_blank"
        >
          <span>Contract address</span>
          <ExportOutlined />
        </a>
      </div>
      <div className="trade-history">
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Faucet;
