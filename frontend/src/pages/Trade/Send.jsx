import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import SendContainer from "../../components/Trade/SendContainer/SendContainer";
import SendWalletAddress from "../../components/Trade/SendWalletAddress/SendWalletAddress";
import { Button } from "antd";
import { CoinContext } from "../../contexts/CoinContext";
import Loader from "../../components/Loader/Loader";
import { ExportOutlined } from "@ant-design/icons";

const Send = () => {
  const CONTRACT_ADDRESS = "0xdc34b8D2c0b388d120519abC70357d70bC28e46b";
  const ABI = [
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "from",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Sent",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address payable", name: "_to", type: "address" },
      ],
      name: "sendETH",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ];

  const { sendCurrencyValue } = useContext(CoinContext);
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Ensure initial state is false

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    if (!isConnected) return "Connect Wallet";
    if (!amount) return "Enter an amount";
    if (!recipient) return "Select recipient";
    return "Send";
  };

  const sendETH = async () => {
    if (!window.ethereum) {
      alert("MetaMask or a compatible wallet is required!");
      return;
    }

    setIsLoading(true); // Set loading to true when the transaction starts

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.sendETH(recipient, {
        value: ethers.parseEther(sendCurrencyValue.toString()),
      });

      alert(`Transaction sent! Hash: ${tx.hash}`);
      await tx.wait();
      alert("Transaction confirmed!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed: " + error.message);
    } finally {
      setIsLoading(false); // Ensure loading is turned off after the transaction completes
    }
  };

  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else {
      sendETH();
    }
  };

  return (
    <div className="send trade-child">
      <SendContainer setAmount={setAmount} />
      <SendWalletAddress setRecipient={setRecipient} />
      <Button
        type="primary"
        block
        className={`send-btn trade-btn ${
          isConnected && (!amount || !recipient) ? "disabled" : "enabled"
        }`}
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
  );
};

export default Send;
