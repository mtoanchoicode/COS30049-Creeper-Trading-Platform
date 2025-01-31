import { Button } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import "./ProfileSearchHeader.css";

const ProfileSearchHeader = ({ onSearch }) => {
  const [walletAddress, setWalletAddress] = useState("");

  const handleSearch = () => {
    if (!walletAddress) {
      alert("Please enter a wallet address!");
      return;
    }

    onSearch(walletAddress); // Send wallet address to parent
  };

  return (
    <>
      <h1>Wallet Search</h1>
      <div className="profileSearch-container">
        <input
          type="text"
          placeholder="Search by Wallet Address"
          className="profileSearch-input"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
        />
        <Button className="profileSearch-submitButton" onClick={handleSearch}>
          <SearchOutlined />
        </Button>
      </div>
    </>
  );
};

export default ProfileSearchHeader;
