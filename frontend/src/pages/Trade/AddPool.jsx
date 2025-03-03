import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Button, notification, Input, Statistic } from "antd";
import { formatUnits } from "ethers";
import Loader from "../../components/Loader/Loader";
import AddLiquidity from "../../components/Trade/AddLiquidity/AddLiquidity";
import CreeperPoolABI from "./abi/CreeperPoolABI.json";
import IERC20ABI from "./abi/IERC20ABI.json";

const AddPool = () => {
  const CONTRACT_ADDRESS = "0x66282313102dd160e4eB97033197d8459E6676d0";
  const ABI = CreeperPoolABI;
  const IERC20_ABI = IERC20ABI;

  const [CEPAddress, setCEPAddress] = useState(
    "0x1559368328F951a72da9B7571C6611667dfc72d2"
  );

  const [LNXAddress, setLNXAddress] = useState(
    "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9"
  );

  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [isLoading, setIsLoading] = useState(false); // Ensure initial state is false
  const [CEP_RESERVES, setCEP_RESERVES] = useState();
  const [LNX_RESERVES, setLNX_RESERVES] = useState();
  const [amount, setAmount] = useState("");

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    if (!isConnected) return "Connect Wallet";
    return "Add liquidity to pool";
  };

  const getButtonTextRemove = () => {
    if (isLoading) return "Processing...";
    if (!isConnected) return "Connect Wallet";
    return "Remove liquidity to pool";
  };

  // Function to fetch and update the last claim time
  const getPoolReserves = async () => {
    if (!window.ethereum) return;


    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const poolContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      // Fetch reserve values
      const [reserveCEP, reserveStablecoin] = await poolContract.getReserves();

      console.log(`Creeper Coin Reserve: ${ethers.formatUnits(reserveCEP, 18)}`);
      console.log(`Stablecoin Reserve: ${ethers.formatUnits(reserveStablecoin, 18)}`);
      // console.log("Creeper Coin Reserve:",reserveCEP);
      // console.log("Stablecoin Reserve:", reserveStablecoin);

      setCEP_RESERVES(Number(ethers.formatUnits(reserveCEP, 18)).toFixed(1));
      setLNX_RESERVES(Number(ethers.formatUnits(reserveStablecoin, 18)).toFixed(1));


    } catch (error) {
      console.log(error.message);
      return { reserveCEP: "0", reserveStablecoin: "0" };
    }
  };

  const requestLiquidityAdd = async () => {
    if (!window.ethereum) {
      alert("MetaMask or a compatible wallet is required!");
      return;
    }

    setIsLoading(true); // Set loading to true when the transaction starts

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const pool = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const creepToken = new ethers.Contract(CEPAddress, IERC20_ABI, signer);
      const lnxToken = new ethers.Contract(LNXAddress, IERC20_ABI, signer);

      // Fetch user balance
      const CEP_Balance = await creepToken.balanceOf(signer.address);
      const lNX_Balance = await lnxToken.balanceOf(signer.address);

      const amountCEP = CEP_Balance / 1000n; // Add 25% of balance
      const amountLNX = lNX_Balance / 1000n;

      // Approve contract to use tokens
      await creepToken.approve(CONTRACT_ADDRESS, amountCEP);
      await lnxToken.approve(CONTRACT_ADDRESS, amountLNX);

      //const tx = await pool.addLiquidity(amountCEP, amountLNX);
      const tx = await pool.removeLiquidity(ethers.parseUnits("30", 18));

      notification.info({
        message: "Transaction in progress!",
        description: `Hash: ${tx.hash}`,
      });
      await tx.wait();
      notification.success({
        message: "Successfully add the liquidity",
      });
    } catch (error) {
      console.log(error.message);
      notification.error({
        message: "Transaction failed!",
      });
    } finally {
      setIsLoading(false); // Ensure loading is turned off after the transaction completes
      getPoolReserves();
    }
  };

  const requestLiquidityRemove = async (amount) => {
    if (!window.ethereum) {
      alert("MetaMask or a compatible wallet is required!");
      return;
    }

    setIsLoading(true); // Set loading to true when the transaction starts

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const pool = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const creepToken = new ethers.Contract(CEPAddress, IERC20_ABI, signer);
      const lnxToken = new ethers.Contract(LNXAddress, IERC20_ABI, signer);

      // Fetch user balance
      const CEP_Balance = await creepToken.balanceOf(signer.address);
      const lNX_Balance = await lnxToken.balanceOf(signer.address);

      const amountCEP = CEP_Balance / 1000n; // Add 25% of balance
      const amountLNX = lNX_Balance / 1000n;

      // Approve contract to use tokens
      await creepToken.approve(CONTRACT_ADDRESS, amountCEP);
      await lnxToken.approve(CONTRACT_ADDRESS, amountLNX);

      //const tx = await pool.addLiquidity(amountCEP, amountLNX);
      const tx = await pool.removeLiquidity(ethers.parseUnits("30", 18));

      notification.info({
        message: "Transaction in progress!",
        description: `Hash: ${tx.hash}`,
      });
      await tx.wait();
      notification.success({
        message: "Successfully add the liquidity",
      });
    } catch (error) {
      console.log(error.message);
      notification.error({
        message: "Transaction failed!",
      });
    } finally {
      setIsLoading(false); // Ensure loading is turned off after the transaction completes
      getPoolReserves();
    }
  };

  const handleButtonClickAdd = () => {
    if (!isConnected) {
      open();
    } else {
      requestLiquidityAdd();
    }
  };

  const handleButtonClickRemove = () => {
    if (!isConnected) {
      open();
    } else if (amount) {
      requestLiquidityRemove(amount);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { // ✅ Allow only numbers and decimals
      setAmount(value);
    }
  };


  useEffect(() => {
    if (isConnected) {
      getPoolReserves();
    } else {
      setCEP_RESERVES("0")
      setLNX_RESERVES("0")
    }
  }, [isConnected]);

  return (
    <div className="add trade-child">
      <AddLiquidity
        CEP={CEP_RESERVES}
        LNX={LNX_RESERVES}
        address={CONTRACT_ADDRESS}
      />
      <Button
        type="primary"
        block
        className={`send-btn trade-btn enabled`}
        onClick={handleButtonClickAdd}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? (
          <div className="send-btn-content">
            <Loader />
            <span>Adding please wait...</span>
          </div>
        ) : (
          getButtonText()
        )}
      </Button>
      <Input
        style={{
          textAlign: "center",
          marginTop: "15px",
          marginBottom: "10px",
        }}
        placeholder="Enter amount of token"
        value={amount}
        onChange={handleInputChange}
        disabled={isLoading}
        suffix="Token"
      />
      <Button
        type="primary"
        block
        className={`send-btn trade-btn enabled`}
        onClick={handleButtonClickRemove}
        disabled={isLoading} // Disable button while loading
      >
        {isLoading ? (
          <div className="send-btn-content">
            <Loader />
            <span>Removing please wait...</span>
          </div>
        ) : (
          getButtonTextRemove()
        )}
      </Button>
    </div>
  );
};

export default AddPool;
