import React from "react";
import sortButton from "../../../assets/Market Sort Button.svg"
import selectedsortButton from "../../../assets/Market Sort Button Selected.svg"
import './MarketSortButton.css';


function MarketSortButton() {

    return(
        <img className = "market-sort-button" src={sortButton} alt="Sort button"/>
    );
}

export default MarketSortButton