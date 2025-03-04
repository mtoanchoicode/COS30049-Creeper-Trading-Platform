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
  const CONTRACT_ADDRESS = "0x5b45fb976b4ED18e93412045375b0E8ae0C13955";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingRemove, setIsLoadingRemove] = useState(false);// Ensure initial state is false
  const [CEP_RESERVES, setCEP_RESERVES] = useState();
  const [LNX_RESERVES, setLNX_RESERVES] = useState();
  const [amountCEP, setAmountCEP] = useState();
  const [amountLNX, setAmountLNX] = useState();

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

      const amountCEP = Number(CEP_Balance / 1000n).toFixed(0,1); // Add 25% of balance
      const amountLNX = Number(lNX_Balance / 1000n).toFixed(0,1);

      // Approve contract to use tokens
      await creepToken.approve(CONTRACT_ADDRESS, amountCEP);
      await lnxToken.approve(CONTRACT_ADDRESS, amountLNX);

      const tx = await pool.addLiquidity(amountCEP, amountLNX);

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

  const requestLiquidityRemove = async (amountCEP , amountLNX) => {
    if (!window.ethereum) {
      alert("MetaMask or a compatible wallet is required!");
      return;
    }

    setIsLoadingRemove(true); // Set loading to true when the transaction starts

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const pool = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);

      const creepToken = new ethers.Contract(CEPAddress, IERC20_ABI, signer);
      const lnxToken = new ethers.Contract(LNXAddress, IERC20_ABI, signer);

      // Approve contract to use tokens
      await creepToken.approve(CONTRACT_ADDRESS, amountCEP);
      await lnxToken.approve(CONTRACT_ADDRESS, amountLNX);

      const txCEP = await pool.removeLiquidity(ethers.parseUnits(`${amountCEP}`, 18));
      const txLNX = await pool.removeLiquidity(ethers.parseUnits(`${amountLNX}`, 18));

      await txCEP.wait();
      notification.success({
        message: "Successfully remove CEP the liquidity",
      });
      await txLNX.wait();
      notification.success({
        message: "Successfully remove LNX the liquidity",
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
    } else if (CEP_RESERVES == 0 || LNX_RESERVES == 0) {
      notification.error({
        message: "Liquidity pool is empty. Cannot remove liquidity!",
      });
    } else if (!amountCEP && !amountLNX) {
      notification.error({
        message: "Please enter at least one token amount to remove!",
      });
    }else {
      requestLiquidityRemove(amountCEP || "0", amountLNX || "0");
    }
  };

  const handleInputChangeCEP = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { // ✅ Allow only numbers and decimals
      setAmountCEP(value);
    }
  };

  const handleInputChangeLNX = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) { // ✅ Allow only numbers and decimals
      setAmountLNX(value);
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
      <div style= 
      {{background: "var(--trade-background-color)", 
        padding: "1rem",
        borderRadius: "20px",
        marginTop: "10px",
        marginBottom: "10px",
      }}>
        <p>Enter amount of token CEP:</p>
        <Input
          style= {{
            textAlign: "center",
            marginBottom: "10px",
            background: "transparent",
            color: "var(--white-color)",
            border: "2px solid",
            borderRadius: "10px", 
          }}
          value={amountCEP}
          onChange={handleInputChangeCEP}
          disabled={isLoadingRemove}
          suffix="Token"
        />
        <p>Enter amount of token LNX:</p>
        <Input
          style= {{
            textAlign: "center",
            background: "transparent",
            color: "var(--white-color)",
            border: "2px solid",
            borderRadius: "10px", 
          }}
          value={amountLNX}
          onChange={handleInputChangeLNX}
          disabled={isLoadingRemove}
          suffix="Token"
        />
      </div> 
      <Button
        type="primary"
        block
        className={`send-btn trade-btn enabled`}
        onClick={handleButtonClickRemove}
        disabled={isLoadingRemove} // Disable button while loading
      >
        {isLoadingRemove ? (
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
