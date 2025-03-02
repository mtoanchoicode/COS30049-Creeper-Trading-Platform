import React, { useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAppKitAccount, useAppKit } from "@reown/appkit/react";
import { Button, notification } from "antd";
import Loader from "../../components/Loader/Loader";
import AddLiquidity from "../../components/Trade/AddLiquidity/AddLiquidity";
import { ExportOutlined } from "@ant-design/icons";

const AddPool = () => {
  const CONTRACT_ADDRESS = "";
  const ABI = [
    
  ];

  const [CEPAddress, setCEPAddress] = useState(
    "0x1559368328F951a72da9B7571C6611667dfc72d2"
  );

  const [LNXAddress, setLNXAddress] = useState(
    "0xD1e9eac1381B94421cBDAB76875d8086e7Def8D9"
  );

  const { isConnected } = useAppKitAccount();
  const { open } = useAppKit();
  const [isLoading, setIsLoading] = useState(false); // Ensure initial state is false
  const [CEP_RESERVES, setCEP_RESERVES] = useState("");
  const [LNX_RESERVES, setLNX_RESERVES] = useState("");

  const getButtonText = () => {
    if (isLoading) return "Processing...";
    if (!isConnected) return "Connect Wallet";
    return "Add liquidity to pool";
  };

  // Function to fetch and update the last claim time
  const getPoolReserves = async () => {
    if (!window.ethereum) return;

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const poolContract = new ethers.Contract(LIQUIDITY_POOL_ADDRESS, LIQUIDITY_POOL_ABI, signer);

    try {
        // Fetch reserve values
        const [reserveCEP, reserveStablecoin] = await poolContract.getReserves();

        console.log("Creeper Coin Reserve:", ethers.utils.formatUnits(reserveCEP, 18));
        console.log("Stablecoin Reserve:", ethers.utils.formatUnits(reserveStablecoin, 18));
        
        setCEP_RESERVES(ethers.utils.formatUnits(reserveCEP, 18),)
        setLNX_RESERVES(ethers.utils.formatUnits(reserveStablecoin, 18))
       
    } catch (error) {
        console.log(error.message);
        return { reserveCEP: "0", reserveStablecoin: "0" };
    }
  };

  const requestLiquidity = async () => {
    if (!window.ethereum) {
      alert("MetaMask or a compatible wallet is required!");
      return;
    }

    setIsLoading(true); // Set loading to true when the transaction starts
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigners();
    const pool = new ethers.Contract(LIQUIDITY_POOL_ADDRESS, LIQUIDITY_POOL_ABI, signer);

    try {
    const creepToken = new ethers.Contract(CEPAddress, IERC20_ABI, signer);
    const lnxToken = new ethers.Contract(LNXAddress, IERC20_ABI, signer);
   
    // Fetch user balance
    const CEP_Balance = await creepToken.balanceOf(signer.address);
    const lNX_Balance = await lnxToken.balanceOf(signer.address);

    console.log(`Creep Balance: ${hre.ethers.utils.formatUnits(CEP_Balance, 18)}`);
    console.log(`LNX Balance: ${hre.ethers.utils.formatUnits(lNX_Balance, 18)}`);

    const amountCEP = CEP_Balance.div(1000); // Add 25% of balance
    const amountLNX = lNX_Balance.div(1000);

    // Approve contract to use tokens
    //await creepToken.approve(LIQUIDITY_POOL_ADDRESS, amountCEP);
    //await lnxToken.approve(LIQUIDITY_POOL_ADDRESS, amountLNX);

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

  const handleButtonClick = () => {
    if (!isConnected) {
      open();
    } else {
        requestLiquidity();
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
      {/* <GetFaucetContainer setTokenAddress={setTokenAddress} /> */}
      {/* <p
        style={{
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        CEP reserves in pool: {CEP_RESERVES}
      </p>
      <p
        style={{
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        LNX reserves in pool: {LNX_RESERVES}
      </p> */}

      <AddLiquidity
        CEP = {CEP_RESERVES}
        LNX = {LNX_RESERVES}
        address = {CONTRACT_ADDRESS}
      />
      <Button
        type="primary"
        block
        className={`send-btn trade-btn enabled`}
        onClick={handleButtonClick}
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

      {/* <a
        className="trade-contractAddress"
        href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
        target="_blank"
      >
        <span>Contract address</span>
        <ExportOutlined />
      </a> */}
    </div>
  );
};

export default AddPool;
