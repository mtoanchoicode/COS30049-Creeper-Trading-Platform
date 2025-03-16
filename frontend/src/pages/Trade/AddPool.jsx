import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Button, notification, Input, Statistic } from "antd";
import Loader from "../../components/Loader/Loader";
import AddLiquidity from "../../components/Trade/AddLiquidity/AddLiquidity";
import CreeperPoolABI from "./abi/CreeperPoolABI.json";
import IERC20ABI from "./abi/IERC20ABI.json";


// const handleTransaction = async (userWallet, amountCEP, amountLNX, hash, methodtransactionHash) => {
//   // make the prama for base URL 
//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//   try {
//     await fetch(`${API_BASE_URL}v1/api/transaction/created`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         walletAddress: userWallet,
//         tokenID: selectedTokenID,
//         addressFrom: userWallet,
//         addressTo: poolWallet,
//         amount: transactionAmount,
//         fee: estimatedFee,
//         gas: gasLimit,
//         method: transactionMethod,
//         hashCode: transactionHash,
//         status: transactionStatus 
//       }),
//     });
//   } catch (err) {
//     console.log("Error updating the Creaper database: ", err)
//   }
// };



const AddPool = () => {
  const CONTRACT_ADDRESS = "0x551d6A53CB243E3718257001065Cf8d29F8cdCb8";
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
  const [isLoadingRemove, setIsLoadingRemove] = useState(false); // Ensure initial state is false
  const [CEP_RESERVES, setCEP_RESERVES] = useState();
  const [LNX_RESERVES, setLNX_RESERVES] = useState();

  const [amountCEP, setAmountCEP] = useState("");
  const [amountLNX, setAmountLNX] = useState("");

  const [amountCEP_remove, setAmountCEP_remove] = useState();
  const [amountLNX_remove, setAmountLNX_remove] = useState();


  // const fetchReservesWithoutWallet = async () => {
  //   try {
  //     // Create a provider (Infura, Alchemy, or public RPC)
  //     const provider = new ethers.JsonRpcProvider(RPC_URL);
  
  //     // Connect to contract
  //     const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
  
  //     // Call getReserves()
  //     const [reserve0, reserve1] = await contract.getReserves();
  
  //     console.log(`Reserve 0: ${reserve0.toString()}`);
  //     console.log(`Reserve 1: ${reserve1.toString()}`);
  
  //     return { reserve0: reserve0.toString(), reserve1: reserve1.toString() };
  //   } catch (error) {
  //     console.error("Error fetching reserves:", error);
  //     return { reserve0: "0", reserve1: "0" };
  //   }
  // };
  

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    if (!isConnected) return "Connect Wallet";
    return "Add liquidity to pool";
  };

  const getButtonTextRemove = () => {
    if (isLoading) return "Processing...";
    if (!isConnected) return "Connect Wallet";
    return "Remove liquidity from pool";
  };

  // Function to fetch and update the last claim time
  const getPoolReserves = async () => {
    try {


      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const poolContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      // Fetch reserve values

      if (isConnected) {
        // Fetch reserves using the connected wallet
        const [reserveCEP, reserveStablecoin] = await poolContract.getReserves();
        setCEP_RESERVES(Number(ethers.formatUnits(reserveCEP, 18)).toFixed(1));
        setLNX_RESERVES(
          Number(ethers.formatUnits(reserveStablecoin, 18)).toFixed(1)
        );
      } else {
        const [reserveCEP, reserveStablecoin] = await fetchReservesWithoutWallet();
      }
     

      console.log(
        `Creeper Coin Reserve: ${ethers.formatUnits(reserveCEP, 18)}`
      );
      console.log(
        `Stablecoin Reserve: ${ethers.formatUnits(reserveStablecoin, 18)}`
      );
    
      // console.log("Creeper Coin Reserve:",reserveCEP);
      // console.log("Stablecoin Reserve:", reserveStablecoin);
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

      // // Fetch user balance
      // const CEP_Balance = await creepToken.balanceOf(signer.address);
      // const lNX_Balance = await lnxToken.balanceOf(signer.address);

      if (!amountCEP || isNaN(amountCEP) || parseFloat(amountCEP) <= 0) {
        notification.error({
          message: "Invalid Input",
          description: "Please enter a valid positive number for CEP amount.",
        });
        return;
      }
      
      if (!amountLNX || isNaN(amountLNX) || parseFloat(amountLNX) <= 0) {
        notification.error({
          message: "Invalid Input",
          description: "Please enter a valid positive number for LNX amount.",
        });
        return;
      }

      const amountCEP_add = ethers.parseUnits(amountCEP.toString() , 18);
      const amountLNX_add = ethers.parseUnits(amountLNX.toString() , 18);

      // Approve contract to use tokens
      await creepToken.approve(CONTRACT_ADDRESS, amountCEP_add);
      await lnxToken.approve(CONTRACT_ADDRESS, amountLNX_add);

      const tx = await pool.addLiquidity(amountCEP_add , amountLNX_add);

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

  const requestLiquidityRemove = async (amountCEP, amountLNX) => {
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
  

      const txCEP = await pool.removeLiquidity(
        ethers.parseUnits(amountCEP, 18)
      );
      const txLNX = await pool.removeLiquidity(
        ethers.parseUnits(amountLNX, 18)
      );

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
      setIsLoadingRemove(false); // Ensure loading is turned off after the transaction completes
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
    } else {
      requestLiquidityRemove(amountCEP || "0", amountLNX || "0");
    }
  };

  const handleInputChangeCEP_remove = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // ✅ Allow only numbers and decimals
      setAmountCEP_remove(value);
    }
  };

  const handleInputChangeLNX_remove = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      // ✅ Allow only numbers and decimals
      setAmountLNX_remove(value);
    }
  };

  useEffect(() => {
      getPoolReserves();    
  }, [isConnected]);

  return (
    <div className="add trade-child">
      <div className="trade-main">
        <AddLiquidity
          CEP={CEP_RESERVES}
          LNX={LNX_RESERVES}
          address={CONTRACT_ADDRESS}
          amountCEP={amountCEP}
          amountLNX={amountLNX}
          setAmountCEP={setAmountCEP} 
          setAmountLNX={setAmountLNX} 
          isLoading={isLoading} 
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

        <div
          style={{
            background: "var(--trade-background-color)",
            padding: "1rem",
            borderRadius: "20px",
            marginTop: "10px",
            marginBottom: "10px",
          }}
        >
          <p>Enter amount of token CEP to remove:</p>
          <Input
            style={{
              textAlign: "center",
              marginBottom: "10px",
              marginTop: "5px",
              padding: "0.5rem",
              background: "transparent",
              color: "var(--white-color)",
              border: "1.5px solid",
              borderRadius: "10px",
            }}
            value={amountCEP_remove}
            onChange={handleInputChangeCEP_remove}
            disabled={isLoadingRemove}
            suffix="Tokens"
          />
          <p>Enter amount of token LNX to remove:</p>
          <Input
            style={{
              textAlign: "center",
              marginTop: "5px",
              padding: "0.5rem",
              background: "transparent",
              color: "var(--white-color)",
              border: "1.5px solid",
              borderRadius: "10px",
            }}
            value={amountLNX_remove}
            onChange={handleInputChangeLNX_remove}
            disabled={isLoadingRemove}
            suffix="Tokens"
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
    </div>
  );
};

export default AddPool;
