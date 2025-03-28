import {react, useState} from 'react';
import './NFTCollectionBg.css';
import editIcon from '../../../../assets/pen-to-square-solid.svg'


const NFTCollectionBg = () => {
    const [bg, setBg] = useState("/src/assets/TestBackground.jpg");
    const [showOverlay, setShowOverlay] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file){
            const imageURL = URL.createObjectURL(file);
            setBg(imageURL);
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