import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import SendContainer from "../../components/Trade/SendContainer/SendContainer";
import SendWalletAddress from "../../components/Trade/SendWalletAddress/SendWalletAddress";
import { Button } from "antd";
import { CoinContext } from "../../contexts/CoinContext";

const Send = () => {
  const CONTRACT_ADDRESS = "0xdc34b8D2c0b388d120519abC70357d70bC28e46b"; // Your deployed contract address
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
  ]; // ✅ Correct structure

  const { sendCurrencyValue } = useContext(CoinContext);
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  const getButtonText = () => {
    if (!isConnected) return "Connect wallet";
    if (!amount) return "Enter an amount";
    if (!recipient) return "Select recipient";
    return "Continue";
  };

  const sendETH = async () => {
    if (!window.ethereum) {
      alert("MetaMask or a compatible wallet is required!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    try {
      // Connect to the deployed smart contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      // Call sendETH function from your smart contract
      const tx = await contract.sendETH(recipient, {
        value: ethers.parseEther(sendCurrencyValue.toString()),
      });

      alert(`Transaction sent! Hash: ${tx.hash}`);
      await tx.wait();
      alert("Transaction confirmed!");
    } catch (error) {
      console.error(error);
      alert("Transaction failed: " + error.message);
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
    <div className="send trade-child ">
      <SendContainer setAmount={setAmount} />
      <SendWalletAddress setRecipient={setRecipient} />
      <Button
        type="primary"
        block
        className={`send-btn trade-btn ${
          isConnected && (!amount || !recipient) ? "disabled" : "enabled"
        }`}
        onClick={() => handleButtonClick()}
      >
        {getButtonText()}
      </Button>
    </div>
  );
};

export default Send;
