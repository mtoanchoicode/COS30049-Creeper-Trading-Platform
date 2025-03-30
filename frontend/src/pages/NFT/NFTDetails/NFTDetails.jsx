import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./NFTDetails.css";

import { Button, Tooltip } from "antd";
import { SendOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useAppKitAccount } from "@reown/appkit/react";

const NFTDetails = () => {
  const location = useLocation();
  const nft = location.state?.nft;
  const navigate = useNavigate();
  const { address } = useAppKitAccount();
  const [owner, setOwner] = useState(false);

  useEffect(() => {
    if (nft?.owner && address) {
      setOwner(nft.owner.toLowerCase() === address.toLowerCase());
    }
  }, [nft?.owner, address]);

  const shortenAddress = (ownerAddress) => {
    return ownerAddress.length > 13
      ? `${ownerAddress.slice(0, 6)}...${ownerAddress.slice(-4)}`
      : ownerAddress;
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
          {owner ? (
            <Button type="primary" flex className="list-btn">
              List for sale
            </Button>
          ) : (
            ""
          )}
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
                Owned by{" "}
                <span>{owner ? "You" : shortenAddress(nft.owner)}</span>
              </p>
            </div>
            <div className="nft-details-icons">
              {owner ? (
                <Tooltip title="Transfer">
                  <Link
                    to={`/nft/${nft.collectionAddress}/${nft.id}/transfer`}
                    state={{ nft }}
                  >
                    <SendOutlined />
                  </Link>
                </Tooltip>
              ) : (
                ""
              )}
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
