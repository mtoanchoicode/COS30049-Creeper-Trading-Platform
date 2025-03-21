import React, { useContext, useState } from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import BuyContainer from "../../components/Trade/BuyContainer/BuyContainer";
import { Button, notification } from "antd";
import { ethers } from "ethers";
import { CoinContext } from "../../contexts/CoinContext";
import TransactionHistory from "../../components/Trade/TransactionHistory/TransactionHistory";
import Loader from "../../components/Loader/Loader";
import BuyABI from "./abi/BuyABI.json";
import IERC20ABI from "./abi/IERC20ABI.json";
// import CreeperPoolABI from "./abi/CreeperPoolABI.json";
import { ExportOutlined } from "@ant-design/icons";
import handleTransaction from "../../utils/transactionAPI";

const fetchEthPriceInUSD = async () => {
  const response = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
  );
  // Fetch ETH price from a reliable API
  const data = await response.json();
  return data.ethereum.usd;
};

// const fetchEthPriceInUSD = async () => {
//   const CHAINLINK_ETH_USD_FEED = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";
//   const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY");
//   const abi = ["function latestRoundData() external view returns (uint80, int256, uint256, uint256, uint80)"];
//   const priceFeed = new ethers.Contract(CHAINLINK_ETH_USD_FEED, abi, provider);
//   const [, price] = await priceFeed.latestRoundData();
//   return Number(price) / 1e8;
// };

const Buy = () => {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { setActiveOverlay, buyCurrency } = useContext(CoinContext);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Ensure initial state is false
  const [hashCodeTrasaction, setHashCodeTransaction] = useState("");
  const [addresswallet, setAddressWallet] = useState("");

  const CONTRACT_ADDRESS = "0x8Ac96B30B627F8E6FEFFD40C662c88949a5de140";
  const ABI = BuyABI;
  const IERC20_ABI = IERC20ABI;

  const [CEPAddress, setCEPAddress] = useState(
    "0x1559368328F951a72da9B7571C6611667dfc72d2"
  );

  const [LNXAddress, setLNXAddress] = useState(
    "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9"
  );

  const BuyETH = async (amount) => {
    if (!window.ethereum) {
      alert("MetaMask or a compatible wallet is required!");
      return;
    }

    setIsLoading(true); // Set loading true for disable button when the buy process start

    try {
      const ethPriceInUSD = await fetchEthPriceInUSD(); // Get ETH price in VND from an API
      console.log(amount);
      console.log(ethPriceInUSD);

      let stablecoinAmount = (amount / ethPriceInUSD) * 1890; // Convert the price of LNX - make the dynamic

      // Ensure at most 18 decimals
      stablecoinAmount = parseFloat(stablecoinAmount.toFixed(18));
      //console.log(stablecoinAmount);

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userWallet = await signer.getAddress(); // Get user's wallet address
      setAddressWallet(userWallet);

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const stablecoinContract = new ethers.Contract(
        LNXAddress,
        IERC20_ABI,
        signer
      );

      //wait to approve the stable coin transfer
      const approveStable = await stablecoinContract.approve(
        CONTRACT_ADDRESS,
        ethers.parseUnits(stablecoinAmount.toString(), 18)
      );
      await approveStable.wait();

      // call the buyToken method
      const tx = await contract.buyToken(
        ethers.parseUnits(stablecoinAmount.toString(), 18)
      );

      notification.info({
        message: "Transaction in progress!",
        description: `Hash: ${tx.hash}`,
      });
      setHashCodeTransaction(tx.hash);

      const receipt = await tx.wait();
      const gasUsed = receipt.gasUsed;
      const transactionFee = 0.003 * stablecoinAmount;

      // call the transaction when this is successful

      await handleTransaction(
        userWallet,
        LNXAddress,
        CONTRACT_ADDRESS,
        stablecoinAmount,
        transactionFee,
        gasUsed,
        "Buy",
        tx.hash,
        "Success"
      );


      //userWallet, selectedTokenID, poolWallet, transactionAmount, estimatedFee, gasLimit, transactionMethod, transactionHash, transactionStatus

      notification.success({
        message: "Successfully buy CEP token",
      });
    } catch (error) {
      console.log(error);
      notification.error({
        message: "Transaction failed!",
      });

      // call the transaction when this is successful
      await handleTransaction(
        addresswallet,
        LNXAddress,
        CONTRACT_ADDRESS,
        stablecoinAmount,
        0,
        0,
        "Buy",
        hashCodeTrasaction,
        "Failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else if (amount) {
      console.log("Button clicked!");
      console.log(amount);
      BuyETH(amount);
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Processing Buy...";
    if (!isConnected) return "Connect wallet";
    if (!buyCurrency) return "Select a token";
    if (!amount) return "Enter an amount";
    return "Continue";
  };

  return (
    <div className="buy trade-child">
      <div className="trade-main">
        <BuyContainer
          setAmount={setAmount}
          currency={buyCurrency}
          setActiveOverlay={setActiveOverlay}
        />
        <Button
          type="primary"
          block
          className={`buy-btn trade-btn ${
            isConnected && (!amount || !buyCurrency) ? "disabled" : "enabled"
          }`}
          onClick={handleButtonClick}
          disabled={isLoading} // Disable button while loading
        >
          {isLoading ? (
            <div className="send-btn-content">
              <Loader />
              <span>Buying please wait !!!</span>
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
        <TransactionHistory method="Buy"/>
      </div>
    </div>
  );
};

export default Buy;
