import { Link } from "react-router-dom";
import { useState } from "react";
import "./NewsBlock.css";
import newsData from "../NewsData"

const NewsBlock = () => {
    // State to track the selected category
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Categories list (to be displayed as filter options)
    const categories = ["All", "Ethereum", "BNB", "PEPE", "Shiba"];

    // Filter news based on selected category
    // if all will filterednews = newsdata
    const filteredNews = selectedCategory === "All" 
        ? newsData
        : newsData.filter((news) => news.Category === selectedCategory);


    return (
        <div className="News_List_Container">

            <h1 className="Category_Filter_Heading">Choose a category</h1>

            <div className="Category_Filter_Container">
                {categories.map((category) => (
                    <div 
                        key={category}
                        className={`Category_Filter_Item ${selectedCategory === category ? "active" : ""}`}
                        onClick={() => setSelectedCategory(category)}
                    >
                        {category}
                    </div>
                ))}

            </div>
        
            <div className="NewsBlock_Container">
                {filteredNews.map((news) => (
                    <div key={news.id} className="News_Item_Container">
                        <Link to={`/news/${news.id}`} className="News_Item">

                            <div className="Image_Container">
                                <img src={news.Image} alt={news.Title}></img>
                            </div>

                            <div className="Date_Conatainer">
                                <p className="news_Date">{news.Date}</p>
                            </div>

                            <div className="Tite_Container">
                                <h2 className="news-title">{news.Title}</h2>
                            </div>

                            <div className="Sumary_Container">
                                <p className="news-sumary">{news.Sumary}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsBlock;