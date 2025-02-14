import React from 'react';
import CoinSearchInput from '../../CoinSearchInput/CoinSearchInput';
import './MarketTitle.css';

const MarketTitle = () =>{
    return(
        <div className='market-title'>
            <h1 className='market-heading'>Explore<br></br> The Market</h1>
            <p className='market-description'>Stay updated with live data on trending coins, track your favorite crypto currencies, discover new opportunities and make your decsions.</p>
            <div className='market-search-container'>
                <CoinSearchInput/>
            </div>
        </div>
    )
}

export default MarketTitle