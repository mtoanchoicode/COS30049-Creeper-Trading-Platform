import React from 'react';
import './MarketTitle.css'
import searchIcon from "../../assets/Market Search Icon.svg"

const MarketTitle = () =>{
    return(
        <div className='market-title'>
            <h1 className='market-heading'>Explore The Market</h1>
            <p className='market-description'>Stay updated with live data on trending coins, track your favorite crypto currencies, discover new opportunities and make your decsions.</p>
            <div className='market-search-container'>
                <div className='search-icon-container'>
                    <img src={searchIcon} alt="Search icon"/>
                </div>
                <input className='search-input' type="text" placeholder='Search your coin' />
            </div>
        </div>
    )
}

export default MarketTitle