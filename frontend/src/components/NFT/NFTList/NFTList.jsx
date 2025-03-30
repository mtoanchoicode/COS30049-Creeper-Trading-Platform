import React, { useState, useRef } from "react";
import "./NFTList.css";

import { Button } from "antd";
import CoverImage from "../../../assets/Cover Image.jpg";
import CoverImage_1 from "../../../assets/CoverImage_1.png";
import CoverImage_2 from "../../../assets/CoverImage_2.png";
import CoverImage_3 from "../../../assets/CoverImage_3.png";
import CoverImage_4 from "../../../assets/CoverImage_4.png";
import CoverImage_5 from "../../../assets/CoverImage_5.png";
import { Link } from "react-router-dom";

const NFTList = ({ sectionRef }) => {
  const [nfts, setNfts] = useState([
    {
      id: "minecraft-blocks",
      name: "Minecraft block",
      price: "3.16",
      image: CoverImage,
      address: "0x8f580074776FB3254AEFaFb1e2ca985F4F2AE85D",
    },
    {
      id: "fidenza-by-tyler-hobbs",
      name: "Fidenza by Tyler Hobbs",
      price: "3.16",
      image: CoverImage_1,
      address: "0x8f580074776FB3254AEFaFb1e2ca985F4F2AE85D",
    },
    {
      id: "axie",
      name: "Axie",
      price: "3.16",
      image: CoverImage_2,
      address: "0x8f580074776FB3254AEFaFb1e2ca985F4F2AE85D",
    },
    {
      id: "doodles",
      name: "Doodles",
      price: "3.16",
      image: CoverImage_3,
      address: "0x8f580074776FB3254AEFaFb1e2ca985F4F2AE85D",
    },
    {
      id: "renga",
      name: "RENGA",
      price: "3.16",
      image: CoverImage_4,
      address: "0x8f580074776FB3254AEFaFb1e2ca985F4F2AE85D",
    },
    {
      id: "azuki-elementals",
      name: "Azuki Elementals",
      price: "3.16",
      image: CoverImage_5,
      address: "0x8f580074776FB3254AEFaFb1e2ca985F4F2AE85D",
    },
  ]);

  return (
    <div className="nft-list" ref={sectionRef}>
      <div className="nft-list-top">
        <div className="nft-list-title">
          <h2>Explore a World of NFT Collections</h2>
        </div>
        <Link to={`/create/collection`} >
          <div className="nft-list-creation">
            <Button type="primary" block className="create-btn">
              Create your collection
              <span>
                <i className="fa-solid fa-plus"></i>
              </span>
            </Button>
          </div>
        </Link>
      </div>
      <div className="nft-list-bottom">
        {nfts.map((nft) => (
          <Link to={`/nft/${nft.id}`} state={{ nft }}>
            <div className="nft-collection-card" key={nft.id}>
              <div className="nft-collection-cover">
                <img src={nft.image} alt={nft.name} />
              </div>
              <div className="nft-collection-desc">
                <div className="nft-collection-header">
                  <h3>{nft.name}</h3>
                  <svg
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-label="verified-icon"
                    class="sc-9c65691d-0 hDXJCP"
                    fill="none"
                    viewBox="0 0 30 30"
                    width="25"
                    height="25"
                  >
                    <path
                      d="M13.474 2.80108C14.2729 1.85822 15.7271 1.85822 16.526 2.80108L17.4886 3.9373C17.9785 4.51548 18.753 4.76715 19.4892 4.58733L20.9358 4.23394C22.1363 3.94069 23.3128 4.79547 23.4049 6.0278L23.5158 7.51286C23.5723 8.26854 24.051 8.92742 24.7522 9.21463L26.1303 9.77906C27.2739 10.2474 27.7233 11.6305 27.0734 12.6816L26.2903 13.9482C25.8918 14.5928 25.8918 15.4072 26.2903 16.0518L27.0734 17.3184C27.7233 18.3695 27.2739 19.7526 26.1303 20.2209L24.7522 20.7854C24.051 21.0726 23.5723 21.7315 23.5158 22.4871L23.4049 23.9722C23.3128 25.2045 22.1363 26.0593 20.9358 25.7661L19.4892 25.4127C18.753 25.2328 17.9785 25.4845 17.4886 26.0627L16.526 27.1989C15.7271 28.1418 14.2729 28.1418 13.474 27.1989L12.5114 26.0627C12.0215 25.4845 11.247 25.2328 10.5108 25.4127L9.06418 25.7661C7.86371 26.0593 6.6872 25.2045 6.59513 23.9722L6.48419 22.4871C6.42773 21.7315 5.94903 21.0726 5.24777 20.7854L3.86969 20.2209C2.72612 19.7526 2.27673 18.3695 2.9266 17.3184L3.70973 16.0518C4.10824 15.4072 4.10824 14.5928 3.70973 13.9482L2.9266 12.6816C2.27673 11.6305 2.72612 10.2474 3.86969 9.77906L5.24777 9.21463C5.94903 8.92742 6.42773 8.26854 6.48419 7.51286L6.59513 6.0278C6.6872 4.79547 7.86371 3.94069 9.06418 4.23394L10.5108 4.58733C11.247 4.76715 12.0215 4.51548 12.5114 3.9373L13.474 2.80108Z"
                      class="sc-9c65691d-1 Sxbrk"
                      fill="#2081E2"
                    ></path>
                    <path
                      d="M13.5 17.625L10.875 15L10 15.875L13.5 19.375L21 11.875L20.125 11L13.5 17.625Z"
                      fill="#FFFFFF"
                      stroke="#FFFFFF"
                    ></path>
                  </svg>
                </div>
                <div>
                  <p className="nft-collection-desc-title">Floor</p>
                  <p className="nft-collection-price">{nft.price} ETH</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
        <Link to={`/create/collection`} >
          <div className="nft-collection-card create">
            <div>
              <i className="fa-solid fa-plus"></i>
            </div>
            <h4>Create New Collection</h4>
          </div>
        </Link>
       
      </div>
    </div>
  );
};

export default NFTList;
