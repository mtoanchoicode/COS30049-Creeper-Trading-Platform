import React from "react";
import { Link, useParams } from "react-router-dom";

import "./CoinDetails.css"

const CoinDetails = () =>{
    const {coinId} = useParams();
    console.log(coinId);

    return(
        <h1>
            {coinId}
        </h1>
    );
}

export default CoinDetails