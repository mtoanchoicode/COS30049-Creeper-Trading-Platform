import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import "./NewsBlock.css";
import { NewsContext } from "../../../contexts/NewsContext";

const NewsBlock = () => {
    const {newsData} = useContext(NewsContext);

    // State to track the selected category
    const [selectedCategory, setSelectedCategory] = useState("All");

    // State for sorting order (latest or oldest)
    const [sortOrder, setSortOrder] = useState("latest");

    // Categories list (to be displayed as filter options)
    const categories = ["All", "Ethereum", "BNB", "PEPE", "Shiba", "Regulation"];

    // Filter news based on selected category
    // if all will filterednews = newsdata
    const filteredNews = selectedCategory === "All" 
        ? newsData
        : newsData.filter((news) => news.Category === selectedCategory);

    // Sort news by date (latest or oldest)
    filteredNews.sort((a, b) => {
        //old
        const dateA = new Date(a.Date);
        //new
        const dateB = new Date(b.Date);
        return sortOrder === "latest" ? dateB - dateA : dateA - dateB;
    });


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

            <div className="Sort_Filter_Container">
                <div className="DataOrder_Sort_Container">
                    <label className="DataOrder_Sort_Label" htmlFor="sortOrder_label">Sort by Date:</label>
                    <select 
                        title="DataOrder Sort Select"
                        className="DataOrder_Sort_Select"
                        id="sortOrder" 
                        value={sortOrder} 
                        onChange={(e) => setSortOrder(e.target.value)}
                    >
                        <option className="DataOrder_Sort_Option" value="latest">Latest</option>
                        <option className="DataOrder_Sort_Option" value="oldest">Oldest</option>
                    </select>
                </div>
            </div>
           
        
            <div className="NewsBlock_Container">
                {filteredNews.map((news) => (
                    <div key={news.id} className="News_Item_Container">
                        <Link to={`/news/${news.id}`} className="News_Item">

                            <div className="Image_Container">
                                <img src={news.Image} alt={news.Title}></img>
                            </div>

                            <div className="News-Item_Content_Block">    
                                <div className="Date_Conatainer">
                                    <p className="news_Date">{new Date(news.Date).toLocaleDateString("en-CA")}</p>
                                </div>

                                <div className="Title_Container">
                                    <h2 className="news-title">{news.Title}</h2>
                                </div>

                                <div className="Sumary_Container">
                                    <p className="news-sumary">{news.Summary}</p>
                                </div>
                            </div>      
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsBlock;