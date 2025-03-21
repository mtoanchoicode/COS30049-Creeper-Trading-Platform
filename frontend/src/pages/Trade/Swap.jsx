import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Button, notification } from "antd";
import SwapContainer from "../../components/Trade/SwapContainer/SwapContainer";
import TransactionHistory from "../../components/Trade/TransactionHistory/TransactionHistory";
import { CoinContext } from "../../contexts/CoinContext";
import { ExportOutlined } from "@ant-design/icons";
import IERC20ABI from "./abi/IERC20ABI.json";
import handleTransaction from "../../utils/transactionAPI";

const Swap = ({ showHistory = true }) => {
  const CONTRACT_ADDRESS = "0x186Bac65ED4d7cfecB47A941cdff6Ef264C9fd41";
  const CONTRACT_ABI = [
    {
      inputs: [
        { internalType: "address", name: "_usdt", type: "address" },
        { internalType: "address", name: "_link", type: "address" },
        { internalType: "address", name: "_priceFeed", type: "address" },
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
          name: "owner",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "usdtAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "linkAmount",
          type: "uint256",
        },
      ],
      name: "LiquidityAdded",
      type: "event",
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
          internalType: "uint256",
          name: "usdtAmount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "linkAmount",
          type: "uint256",
        },
      ],
      name: "Swap",
      type: "event",
    },
    {
      inputs: [],
      name: "LINK",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "USDT",
      outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "usdtAmount", type: "uint256" },
        { internalType: "uint256", name: "linkAmount", type: "uint256" },
      ],
      name: "addLiquidity",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "feePercent",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getLatestPrice",
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
      name: "priceFeed",
      outputs: [
        {
          internalType: "contract AggregatorV3Interface",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "uint256", name: "usdtAmount", type: "uint256" },
      ],
      name: "swapUSDTForLINK",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const { swapFromCurrencyValue, swapToCurrencyValue } =
    useContext(CoinContext);
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [walletAddr, setWalletAddr] = useState("");

  const SwapContract = async () => {
    if (!window.ethereum) {
      notification.error({
        message: "Wallet Required",
        description: "MetaMask or a compatible wallet is required!",
      });
      return;
    }
    setIsLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddress = await signer.getAddress();
      setWalletAddr(userAddress);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer
      );

      const UsdtCoinContract = new ethers.Contract(
        "0x4B381C5B09482C10feAB7730b21Cf97D1d45EBd1",
        IERC20ABI,
        signer
      );

      const approveUsdt = await UsdtCoinContract.approve(
        CONTRACT_ADDRESS,
        ethers.parseUnits(swapFromCurrencyValue.toString(), 18)
      );
      await approveUsdt.wait();

      const tx = await contract.swapUSDTForLINK(
        ethers.parseUnits(swapFromCurrencyValue.toString(), 18)
      );
      notification.info({
        message: "Swapping Transaction Created",
        description: `Transaction Hash: ${tx.hash}`,
      });
      const receipt = await tx.wait();

      notification.success({
        message: " Transaction Confirmed",
        description:
          "Your swapping transaction has been successfully confirmed!",
      });

      const gasUsed = receipt.gasUsed;
      const transactionFee = 0.003 * swapFromCurrencyValue;

      // update this for dynamic token address
      await handleTransaction(
        userAddress,
        "0x4b381c5B09482c10feab7730b21cf97d1d45ebd1",
        userAddress,
        swapFromCurrencyValue,
        transactionFee,
        gasUsed,
        "Swap",
        tx.hash,
        "Success"
      );
    } catch (error) {
      console.error("Swap failed:", error);
      notification.error({
        message: "Transaction Failed",
        description:
          error.reason || error.message || "An unknown error occurred.",
      });

      await handleTransaction(
        walletAddr,
        "0x4B381C5B09482C10feAB7730b21Cf97D1d45EBd1",
        walletAddr,
        swapFromCurrencyValue,
        0,
        0,
        "Swap",
        "",
        "Fail"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else if (swapFromCurrencyValue) {
      SwapContract();
    }
  };

  const getButtonText = () => {
    if (!isConnected) return "Connect wallet";
    if (!swapFromCurrencyValue) return "Enter an amount";
    if (isLoading) return "Swapping";
    return "Swap";
  };

  return (
    <div className="swap trade-child">
      <div className="trade-main">
        <SwapContainer />
        <Button
          type="primary"
          block
          loading={isLoading}
          className={`swap-btn trade-btn ${
            isConnected && !swapFromCurrencyValue ? "disabled" : "enabled"
          }`}
          onClick={handleButtonClick}
        >
          {getButtonText()}
        </Button>
        <a
          className="trade-contractAddress"
          href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Contract address</span>
          <ExportOutlined />
        </a>
      </div>
      {showHistory && (
        <div className="trade-history">
          <TransactionHistory method = "Swap"/>
        </div>
      )}
    </div>
  );
};

export default Swap;
