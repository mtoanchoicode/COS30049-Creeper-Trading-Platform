import React, { useState, useEffect } from "react";
import "./NFTCollectionHeader.css";

import {
  MoreOutlined,
  ExportOutlined,
  EditOutlined,
  FileImageOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import {
  uploadDescriptionToDB,
  getDescriptionFromDB,
  uploadImageToDB,
  getImageURLFromDB,
} from "../../../utils/CollectionDetailsAPI";
import defaultBg from "../../../assets/defaultCollectionBackground.jpg";

const NFTCollectionHeader = ({
  isLoading,
  nft,
  authOwner,
  contractAddress,
  date,
  lengths,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showEditDesc, setShowEditDesc] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionToChange, setDescriptionToChange] = useState(description);
  const [background, setBackground] = useState(defaultBg);
  const [tempBg, setTempBg] = useState(null);
  const [tempBgURL, setTempBgURL] = useState(null);
  const [imageName, setImageName] = useState("");

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const desc = await getDescriptionFromDB(contractAddress);
        setDescription(desc || "");
        setDescriptionToChange(desc || "");
      } catch (error) {
        console.error("Error fetching description:", error);
      }
    };

    fetchDescription();
  }, [contractAddress]);

  useEffect(() => {
    const fetchBackgroundUrl = async () => {
      try {
        const url = await getImageURLFromDB(contractAddress);
        setBackground(url || defaultBg);
      } catch (error) {
        console.error("Error fetching background URL:", error);
      }
    };
    fetchBackgroundUrl();
  }, [contractAddress]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setTempBg(file);
      setTempBgURL(imageURL);
      setImageName(file.name);
    }
  };

  const handleSaveImage = () => {
    if (tempBg) {
      setBackground(tempBgURL); // ✅ Update background too
      uploadImageToDB(contractAddress, tempBg);
      setTempBg(null);
    }
  };

  const handleCancelImage = () => {
    setTempBg(null);
  };

  const toggleExpanded = () => setExpanded(!expanded);

  const toggleEditDescOverlay = () => {
    setShowEditDesc(!showEditDesc);
    setDescriptionToChange(description);
  };

  const handleChangeDescription = async () => {
    try {
      await uploadDescriptionToDB(contractAddress, descriptionToChange);
      setDescription(descriptionToChange);
      toggleEditDescOverlay();
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  const content = (
    <div className="nft-popover">
      <a
        className="nft-popover-item"
        href={`https://sepolia.etherscan.io/address/${nft.address}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <ExportOutlined />
        <span>View on EtherScan </span>
      </a>
      <div
        onClick={toggleEditDescOverlay}
        style={{ display: authOwner ? "block" : "none" }}
        className="nft-popover-item"
      >
        <EditOutlined />
        <span>Edit Collection</span>
      </div>
    </div>
  );

  return (
    <div className="nft-collection-header">
      {showEditDesc && (
        <div className="nft-collection-description-overlay">
          <div className="nft-collection-set-description-container">
            <h2 className="nft-collection-set-description-header">
              Edit Collection
            </h2>
            <textarea
              type="text"
              id="nft-collection-set-description-input"
              className="nft-collection-set-description-input"
              placeholder="Please enter a description"
              value={descriptionToChange}
              onChange={(e) => setDescriptionToChange(e.target.value)}
            ></textarea>
            <div className="nft-collection-set-image-input">
              {tempBg ? (
                <div className="nft-collection-set-image-container">
                  <div className="nft-collection-set-image-cover">
                    <img
                      src={tempBgURL}
                      alt="Preview"
                      className="image-preview"
                    />
                  </div>
                  <p>{imageName}</p>
                </div>
              ) : (
                <label htmlFor="collectionImageUpload">
                  <FileImageOutlined />
                  <p>Drag and drop or click to upload</p>
                </label>
              )}
              <input
                type="file"
                id="collectionImageUpload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
            </div>
            <div className="nft-collection-set-description-btns">
              <button
                className="nft-collection-set-description-btn-cancel"
                onClick={() => {
                  handleCancelImage();
                  toggleEditDescOverlay();
                }}
              >
                Cancel
              </button>
              <button
                className="nft-collection-set-description-btn-save"
                onClick={() => {
                  handleChangeDescription();
                  handleSaveImage();
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div
        className="nft-collection-header-cover"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="nft-collection-header-container">
          <div className="nft-collection-header-logo">
            <div className="nft-collection-header-logo-container">
              <img src={nft.CollectionImage} alt={nft.CollectionName} />
            </div>

            <p>{nft.CollectionName}</p>
          </div>
        </div>
      </div>
      <div className="nft-collection-header-bottom">
        {isLoading ? (
          <div className="nft-collection-header-desc nft-skeleton">
            <div className="nft-collection-header-desc-text"></div>
            <div className="nft-collection-header-desc-stat"></div>
          </div>
        ) : (
          <div className="nft-collection-header-desc">
            {description ? (
              description.length > 70 ? (
                <div className="nft-collection-header-desc-text">
                  {expanded
                    ? description
                    : `${description.substring(0, 70)}...`}{" "}
                  <button onClick={toggleExpanded} className="see-more-btn">
                    {expanded ? "See Less" : "See More"}
                  </button>
                </div>
              ) : (
                <div className="nft-collection-header-desc-text">
                  {description}
                </div>
              )
            ) : null}
            <div className="nft-collection-header-desc-stat">
              <div>
                <p>Items</p>
                <p>{lengths}</p>
              </div>
              <div>
                <p>Created</p>
                <p>{date}</p>
              </div>
              <div>
                <p>Chain</p>
                <p>Sepolia</p>
              </div>
            </div>
          </div>
        )}

        <div className="nft-collection-header-btn">
          <Popover content={content} trigger="click">
            <MoreOutlined />
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default NFTCollectionHeader;
