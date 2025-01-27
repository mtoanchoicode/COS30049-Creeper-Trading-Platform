import React from "react";
import sortButton from "../../../assets/Market Sort Button.svg"
import './MarketSortButton.css';


function MarketSortButton(props) { 
    return(
        <span className = {`market-sort-button ${props.direction} ${props.isSelected}`}  src={sortButton} alt="Sort button"></span>
    );
}

export default MarketSortButton