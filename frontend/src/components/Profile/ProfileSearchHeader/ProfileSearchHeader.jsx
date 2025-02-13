import { Button } from "antd";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./ProfileSearchHeader.css";

const ProfileSearchHeader = ({ onSearch }) => {
  const [walletAddress, setWalletAddress] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!walletAddress) {
      alert("Please enter a wallet address!");
      return;
    }
    navigate(`/profile/transactions/${walletAddress}`);
    onSearch(walletAddress);
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
