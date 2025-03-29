import {react, useEffect, useState} from 'react';
import './NFTCollectionBg.css';
import editIcon from '../../../../assets/pen-to-square-solid.svg';
import defaultBg from '../../../../assets/TestBackground.jpg';
import { notification } from "antd";
import { uploadImageToDB, getImageURLFromDB } from "../../../../utils/CollectionDetailsAPI";

const NFTCollectionBg = ({ contractAddress }) => {
    console.log(getImageURLFromDB(contractAddress))
    const [bg, setBg] = useState(getImageURLFromDB(contractAddress) || defaultBg);
    const [showOverlay, setShowOverlay] = useState(false);

    useEffect(() => {
        const fetchBackgroundUrl = async () => {
            try {
                const url = await getImageURLFromDB(contractAddress);
                setBg(url);
            } catch (error) {
                console.error('Error fetching background URL:', error);
            }
        };

        fetchBackgroundUrl();
    }, [contractAddress]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file){
            const imageURL = URL.createObjectURL(file);
            setBg(imageURL);
            uploadImageToDB(contractAddress, file);
        }
    }

    return(
        <div className="nft-collection-header-cover"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => setShowOverlay(false)}
            style={{
                backgroundImage: `url(${bg})`,
            }}
            >
            {
                <div className='nft-collection-header-cover-overlay' style={{filter: `opacity(${showOverlay? "1": "0"})`}}>
                    <label className='nft-collection-header-cover-overlay-upload-label' htmlFor='backgroundFileUpload'>
                        <img src={editIcon} alt="Edit icon" />
                    </label>

                    <input className='nft-collection-header-cover-overlay-upload-input' type='file' id='backgroundFileUpload' accept='image/*' onChange={handleImageUpload} />
                </div>
            }
        </div>
    )
}

export default NFTCollectionBg;