import React, { useContext, useState } from "react";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Button, notification } from "antd";
import SwapContainer from "../../components/Trade/SwapContainer/SwapContainer";
import TransactionHistory from "../../components/Trade/TransactionHistory/TransactionHistory";
import { CoinContext } from "../../contexts/CoinContext";

import IERC20ABI from "./abi/IERC20ABI.json";
import handleTransaction from "../../utils/transactionAPI";

const Swap = ({ showHistory = true }) => {
  const CONTRACT_ADDRESS = "0x280dcb3c92dc25023e939f8D5a9D8ACcBf62590E";
  const CONTRACT_ABI = [
    {
      inputs: [{ internalType: "address", name: "token", type: "address" }],
      name: "SafeERC20FailedOperation",
      type: "error",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "tokenA",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "tokenB",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "pool",
          type: "address",
        },
      ],
      name: "PoolRegistered",
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
          indexed: true,
          internalType: "address",
          name: "tokenIn",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "tokenOut",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountIn",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amountOut",
          type: "uint256",
        },
      ],
      name: "SwapExecuted",
      type: "event",
    },
    {
      inputs: [
        { internalType: "address", name: "", type: "address" },
        { internalType: "address", name: "", type: "address" },
      ],
      name: "pools",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "tokenA", type: "address" },
        { internalType: "address", name: "tokenB", type: "address" },
        { internalType: "address", name: "pool", type: "address" },
      ],
      name: "registerPool",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        { internalType: "address", name: "tokenIn", type: "address" },
        { internalType: "address", name: "tokenOut", type: "address" },
        { internalType: "uint256", name: "amountIn", type: "uint256" },
      ],
      name: "swap",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const { swapFromCurrency, swapToCurrency, swapFromCurrencyValue } =
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

      const poolAddress = await contract.pools(
        swapFromCurrency.address,
        swapToCurrency.address
      );
      console.log("Pool Address:", poolAddress);

      const TokenInContract = new ethers.Contract(
        swapFromCurrency.address,
        IERC20ABI,
        signer
      );
      const approveTx = await TokenInContract.approve(
        CONTRACT_ADDRESS, // ✅ Approving LiquidityPool
        ethers.parseUnits(swapFromCurrencyValue.toString(), 18)
      );
      await approveTx.wait();

      const tx = await contract.swap(
        swapFromCurrency.address,
        swapToCurrency.address,
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
        swapFromCurrency.address,
        userAddress,
        swapFromCurrencyValue,
        transactionFee,
        gasUsed,
        "Swap",
        tx.hash,
        "Success"
      );
    } catch (error) {
      console.error("Swap failed with reason:", error.reason);
      console.error("Swap failed:", error);
      notification.error({
        message: "Transaction Failed",
        description:
          error.reason || error.message || "An unknown error occurred.",
      });

      await handleTransaction(
        walletAddr,
        swapFromCurrency.address,
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
          disabled={isLoading} // Disable button while loading
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
          <TransactionHistory method="Swap" />
        </div>
      )}
    </div>
  );
};

export default Swap;
