import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";

import SendContainer from "../../components/Trade/SendContainer/SendContainer";
import SendWalletAddress from "../../components/Trade/SendWalletAddress/SendWalletAddress";
import { Button, notification } from "antd";
import TransactionHistory from "../../components/Trade/TransactionHistory/TransactionHistory";
import { CoinContext } from "../../contexts/CoinContext";
import Loader from "../../components/Loader/Loader";
import { ExportOutlined } from "@ant-design/icons";
import handleTransaction from "../../utils/transactionAPI";

const Send = () => {
  const CONTRACT_ADDRESS = "0x9239712E274332d3b34a7eeAD4De226376fBF370";
  const ABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint256",
          name: "newFeePercentage",
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
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
      ],
      name: "Sent",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
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
      name: "TokenWithdrawn",
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
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
      ],
      name: "Withdrawn",
      type: "event",
    },
    {
      inputs: [],
      name: "feePercentage",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [{ internalType: "address payable", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "_token", type: "address" },
        { internalType: "address payable", name: "_to", type: "address" },
        { internalType: "uint256", name: "_amount", type: "uint256" },
      ],
      name: "sendFunds",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "_newFeePercentage", type: "uint256" },
      ],
      name: "setFeePercentage",
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
    {
      inputs: [{ internalType: "address", name: "_token", type: "address" }],
      name: "withdrawTokens",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    { stateMutability: "payable", type: "receive" },
  ];

  const ERC20_ABI = [
    { inputs: [], stateMutability: "nonpayable", type: "constructor" },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "allowance", type: "uint256" },
        { internalType: "uint256", name: "needed", type: "uint256" },
      ],
      name: "ERC20InsufficientAllowance",
      type: "error",
    },
    {
      inputs: [
        { internalType: "address", name: "sender", type: "address" },
        { internalType: "uint256", name: "balance", type: "uint256" },
        { internalType: "uint256", name: "needed", type: "uint256" },
      ],
      name: "ERC20InsufficientBalance",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "approver", type: "address" }],
      name: "ERC20InvalidApprover",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "receiver", type: "address" }],
      name: "ERC20InvalidReceiver",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "sender", type: "address" }],
      name: "ERC20InvalidSender",
      type: "error",
    },
    {
      inputs: [{ internalType: "address", name: "spender", type: "address" }],
      name: "ERC20InvalidSpender",
      type: "error",
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
          indexed: true,
          internalType: "address",
          name: "spender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Approval",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "from",
          type: "address",
        },
        { indexed: true, internalType: "address", name: "to", type: "address" },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
      ],
      name: "Transfer",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "owner", type: "address" },
        { internalType: "address", name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "spender", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "name",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "symbol",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "transfer",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "from", type: "address" },
        { internalType: "address", name: "to", type: "address" },
        { internalType: "uint256", name: "value", type: "uint256" },
      ],
      name: "transferFrom",
      outputs: [{ internalType: "bool", name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const { sendCurrencyValue, sendTokenAddress } = useContext(CoinContext);
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [tokenAddress, setTokenAddress] = useState(""); // ERC-20 Token Address
  const [isLoading, setIsLoading] = useState(false); // Ensure initial state is false
  const [walletAddr, setWalletAddr] = useState("");

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    if (!isConnected) return "Connect Wallet";
    if (!amount) return "Enter an amount";
    if (!recipient) return "Select recipient";
    return "Send";
  };

  const sendFunds = async () => {
    if (!window.ethereum) {
      notification.error({
        message: "Wallet Required",
        description: "MetaMask or a compatible wallet is required!",
      });
      return;
    }

    setIsLoading(true); // Set loading to true when the transaction starts

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setWalletAddr(userAddress);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const isETH =
        !sendTokenAddress ||
        sendTokenAddress === "0x0000000000000000000000000000000000000000";

      if (isETH) {
        // Check ETH balance
        const balance = await provider.getBalance(userAddress);
        const amountToSend = ethers.parseEther(sendCurrencyValue.toString());

        if (balance < amountToSend) {
          notification.error({
            message: "Insufficient Balance",
            description:
              "You do not have enough ETH to complete this transaction.",
          });
          setIsLoading(false);
          return;
        }

        const tx = await contract.sendFunds(
          "0x0000000000000000000000000000000000000000", // ETH address
          recipient,
          ethers.parseEther(sendCurrencyValue.toString()),
          { value: ethers.parseEther(sendCurrencyValue.toString()) }
        );
        notification.info({
          message: "ETH Transaction Created",
          description: `Transaction Hash: ${tx.hash}`,
        });

        await tx.wait();

        notification.success({
          message: "Transaction Confirmed",
          description: "Your ETH transaction has been successfully confirmed!",
        });

        await handleTransaction(
          userAddress,
          sendTokenAddress,
          recipient,
          sendCurrencyValue,
          transactionFee,
          gasUsed,
          "Send",
          tx.hash,
          "Success"
        );
      } else {
        const tokenContract = new ethers.Contract(
          sendTokenAddress,
          ERC20_ABI,
          signer
        );

        // Check token balance
        const balance = await tokenContract.balanceOf(userAddress);
        const amountToSend = ethers.parseUnits(
          sendCurrencyValue.toString(),
          18
        );

        if (balance < amountToSend) {
          notification.error({
            message: "Insufficient Token Balance",
            description:
              "You do not have enough tokens to complete this transaction.",
          });
          setIsLoading(false);
          return;
        }

        // Approve the contract to spend tokens
        const approveTx = await tokenContract.approve(
          CONTRACT_ADDRESS,
          ethers.parseUnits(sendCurrencyValue.toString(), 18)
        );
        await approveTx.wait();

        notification.info({
          message: "Approval Successful",
          description: `Token approval completed with hash. Sending transaction now...`,
        });

        const tx = await contract.sendFunds(
          sendTokenAddress,
          recipient,
          ethers.parseUnits(sendCurrencyValue.toString(), 18)
        );
        notification.info({
          message: "Token Transaction Created",
          description: `Transaction Hash: ${tx.hash}`,
        });
        const receipt = await tx.wait();
        notification.success({
          message: "Transaction Confirmed",
          description:
            "Your token transaction has been successfully confirmed!",
        });

        const gasUsed = receipt.gasUsed;
        const transactionFee = 0.003 * sendCurrencyValue;

        await handleTransaction(
          userAddress,
          sendTokenAddress,
          recipient,
          sendCurrencyValue,
          transactionFee,
          gasUsed,
          "Send",
          tx.hash,
          "Success"
        );
      }
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Transaction Failed",
        description: error.message || "An unknown error occurred.",
      });

      await handleTransaction(
        walletAddr,
        sendTokenAddress,
        recipient,
        sendCurrencyValue,
        0,
        0,
        "Send",
        "",
        "Fail"
      );
    } finally {
      setIsLoading(false); // Ensure loading is turned off after the transaction completes
    }
  };

  const handleButtonClick = () => {
    if (!isConnected) {
      open(); // Open wallet connection
    } else {
      sendFunds();
    }
  };

  return (
    <div className="send trade-child">
      <div className="trade-main">
        <SendContainer
          setAmount={setAmount}
          setTokenAddress={setTokenAddress}
        />
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
      <div className="trade-history">
        <TransactionHistory />
      </div>
    </div>
  );
};

export default Send;
