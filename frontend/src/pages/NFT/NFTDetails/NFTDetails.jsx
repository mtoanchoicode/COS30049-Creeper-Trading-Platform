import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./NFTDetails.css";

import { Button } from "antd";
import { SendOutlined, ShareAltOutlined } from "@ant-design/icons";

const NFTDetails = () => {
  const location = useLocation();
  const nft = location.state?.nft;
  const navigate = useNavigate();

  const shortenAddress = (address) => {
    return `${address.slice(0, 9)}...${address.slice(-4)}`;
  };

  const calculateAge = (timestamp) => {
    const Timenow = new Date();
    const createdAt = new Date(timestamp);
    const diffMs = Timenow - createdAt;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return `${seconds} sec ago`;
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hrs ago`;
    return `${days} days ago`;
  };

  const nftInformation = [
    { title: "Token ID", value: nft.id },
    { title: "Token Standard", value: "ERC-721" },
    {
      title: "Contract Address",
      value: (
        <a
          href={`https://sepolia.etherscan.io/address/${nft.collectionAddress}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#1890ff", textDecoration: "underline" }}
        >
          {shortenAddress(nft.collectionAddress)}
        </a>
      ),
    },
    { title: "Chain", value: "Sepolia" },
    { title: "Last Updated", value: calculateAge(nft.lastUpdated) },
  ];

  return (
    <div className="nft-details">
      <div className="nft-details-bar">
        <div className="nft-details-bar-btns">
          <Button
            type="primary"
            flex
            className="back-btn"
            onClick={() => navigate(-1)}
          >
            <i className="fa-solid fa-arrow-left"></i> Back to collection
          </Button>
          <Button type="primary" flex className="list-btn">
            List for sale
          </Button>
        </div>
      </div>
      <div className="nft-details-main">
        <div className="nft-details-left">
          <div className="nft-detials-left-container">
            <img src={nft.image} alt={nft.name} />
          </div>
        </div>
        <div className="nft-details-right">
          <div className="nft-details-right-top">
            <div className="nft-details-collection">
              <p className="collection-name">{nft.collectionName}</p>
              <h2 className="collection-item-name">{nft.name}</h2>
              <p className="collection-item-owner">
                Owned by <span>{shortenAddress(nft.owner)}</span>
              </p>
            </div>
            <div className="nft-details-icons">
              <Link
                to={`/nft/${nft.collectionAddress}/${nft.id}/transfer`}
                state={{ nft }}
              >
                <SendOutlined />
              </Link>
              <ShareAltOutlined />
            </div>
          </div>
          <div className="nft-details-right-bottom">
            <div className="nft-details-desc">
              <h2>Description</h2>
              <p>{nft.description}</p>
            </div>
            <div className="nft-details-infos">
              <h2>Details</h2>
              {nftInformation.map(({ title, value }) => (
                <div className="nft-details-info" key={title}>
                  <p>{title}</p>
                  <p>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetails;
