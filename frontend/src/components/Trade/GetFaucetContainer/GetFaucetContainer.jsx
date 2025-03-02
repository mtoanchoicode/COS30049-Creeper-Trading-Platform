import React, { useContext, useState } from "react";
import TokensSelection from "../TokensSelection/TokensSelection";

const GetFaucetContainer = ({ setTokenAddress }) => {
  return (
    <div className="getFaucet-container">
      <div className="getFaucet-top">
        <span>You're gettingFaucet</span>
      </div>
      <TokensSelection type="buy" tradeType="buy" />
    </div>
  );
};

export default GetFaucetContainer;
