import { react, useEffect, useState } from "react";
import "./NFTCollectionBg.css";
import editIcon from "../../../../assets/pen-to-square-solid.svg";
import defaultBg from "../../../../assets/defaultCollectionBackground.jpg";
import {
  uploadImageToDB,
  getImageURLFromDB,
} from "../../../../utils/CollectionDetailsAPI";

const NFTCollectionBg = ({ contractAddress, bg }) => {
  const [background, setBackground] = useState(bg || defaultBg);

  useEffect(() => {
    if (!bg) {
      const fetchBackgroundUrl = async () => {
        try {
          const url = await getImageURLFromDB(contractAddress);
          setBackground(url || defaultBg);
        } catch (error) {
          console.error("Error fetching background URL:", error);
        }
      };
      fetchBackgroundUrl();
    } else {
      setBackground(bg);
    }
  }, [bg, contractAddress]);

  return (
    <div
      className="nft-collection-header-cover"
      style={{ backgroundImage: `url(${background})` }}
    ></div>
  );
};

export default NFTCollectionBg;
