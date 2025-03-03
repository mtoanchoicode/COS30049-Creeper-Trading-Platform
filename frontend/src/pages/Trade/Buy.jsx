import React, { useContext, useState } from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import BuyContainer from "../../components/Trade/BuyContainer/BuyContainer";
import { Button, notification} from "antd";
import { ethers } from "ethers";
import { CoinContext } from "../../contexts/CoinContext";
import Loader from "../../components/Loader/Loader";
import BuyABI from "./abi/BuyABI.json";
import IERC20ABI from "./abi/IERC20ABI.json";
import CreeperPoolABI from "./abi/CreeperPoolABI.json";

const fetchEthPriceInVND = async () => {
  // Fetch ETH price from a reliable API
  const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=vnd");
  const data = await response.json();
  return data.ethereum.vnd;
}

const Buy = () => {
  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const { setActiveOverlay, buyCurrency } = useContext(CoinContext);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Ensure initial state is false

  const CONTRACT_ADDRESS = "0x72D4Ae357350a2Ec7C0587C2EF55774E4B8057Bd";
  const ABI = BuyABI;
  const Pool_CONTRACT_ADDRESS = "0x66282313102dd160e4eB97033197d8459E6676d0";
  const Pool_ABI = CreeperPoolABI;
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
      const ethPriceInVND = await fetchEthPriceInVND(); // Get ETH price in VND from an API
      
      let stablecoinAmount= (amount / ethPriceInVND) * 1000; // Convert VND to ETH

      // Ensure at most 18 decimals
      stablecoinAmount = parseFloat(stablecoinAmount.toFixed(18));

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      const stablecoinContract = new ethers.Contract(LNXAddress, IERC20_ABI, signer);
      const CEPcoinContract = new ethers.Contract(CEPAddress, IERC20_ABI, signer);
      const poolContract = new ethers.Contract(Pool_CONTRACT_ADDRESS, Pool_ABI, signer);

      //wait to approve the stable coin transfer
      const approveStable = await stablecoinContract.approve(CONTRACT_ADDRESS, ethers.parseUnits(stablecoinAmount.toString(), 18));
      await approveStable.wait();

      const approveCEP = await CEPcoinContract.approve(CONTRACT_ADDRESS, ethers.MaxUint256);
      await approveCEP.wait();

      //await poolContract.approve(CONTRACT_ADDRESS, ethers.parseUnits("1000", 18));

      //const cepBalance = await CEPcoinContract.balanceOf(creeperPool.address);
      //console.log("CreeperPool CEPcoin balance:", cepBalance.toString()); 
      
      // call the buyToken method
      const tx = await contract.buyToken(ethers.parseUnits(stablecoinAmount.toString(), 18));
      await tx.wait();

      // notification.info({
      //   message: "Transaction in progress!",
      //   description: `Hash: ${tx.hash}`,
      // });
      
      notification.success({
        message: "Successfully buy CEP token",
      });

    } catch (error) {
      console.log(error)
      notification.error({
        message: "Transaction failed!",
      });
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
      BuyETH(amount)
    }
  };

  const getButtonText = () => {
    if (isLoading) return "Processing Buy..."
    if (!isConnected) return "Connect wallet";
    if (!buyCurrency) return "Select a token";
    if (!amount) return "Enter an amount";
    return "Continue";
  };

  return (
    <div className="buy trade-child">
      <BuyContainer
        setAmount={setAmount}
        currency={buyCurrency}
        setActiveOverlay={setActiveOverlay}
      />
      <Button
        type="primary"
        block
        className={`buy-btn trade-btn ${isConnected && (!amount || !buyCurrency) ? "disabled" : "enabled"
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
    </div>
  );
};

export default Buy;
