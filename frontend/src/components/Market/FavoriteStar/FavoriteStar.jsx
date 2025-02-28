import React, {useState} from "react";
import './FavoriteStar.css';

function FavoriteStar(props) { 
    const [favorite, setFavorite] = useState(false);
    const coinSymbol = props.coinSymbol; 

    // Toggle favorite state
    function toggleFavorite(event){
        event.preventDefault(); //Prevent routing from Link parent
        setFavorite(prev => !prev);
        console.log(coinSymbol); //testing coinSymbol
    }

    return(
        <span className={`market-favorite-star ${favorite? "isFavorite": "notFavorite"}`} alt="Star Icon"
            onClick={toggleFavorite}
        >
        </span>
    );
}

export default FavoriteStar