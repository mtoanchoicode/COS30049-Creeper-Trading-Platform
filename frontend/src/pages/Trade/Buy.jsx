import React, { useContext, useState } from "react";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import BuyContainer from "../../components/Trade/BuyContainer/BuyContainer";
import { Button } from "antd";
import { ethers } from "ethers";
import { CoinContext } from "../../contexts/CoinContext";

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

  const CONTRACT_ADDRESS = "";
  const ABI = [
  ];

  const BuyETH = async (amount) => {
    if (!window.ethereum) {
      alert("MetaMask or a compatible wallet is required!");
      return;
    }

    setIsLoading(true); // Set loading true for disable button when the buy process start

    try {
      const ethPriceInVND = await fetchEthPriceInVND(); // Get ETH price in VND from an API
      const stablecoinAmount= (amount / ethPriceInVND) * 50; // Convert VND to ETH


      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const tx = await contract.buyToken({value: ethers.utils.parseEther(stablecoinAmount.toString())});

      await tx.wait();
      console.log("Transaction buy successful!");
      alert("Transaction buy successful !!");

    } catch (error) {
      console.log(error)
      alert("Transaction buy failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else if (amount) {
      console.log("Button clicked!");
      //BuyETH()
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
