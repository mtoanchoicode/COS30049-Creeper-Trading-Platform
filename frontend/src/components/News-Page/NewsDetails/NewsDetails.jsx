import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import "./NewsDetails.css";
import newsData from "../NewsData"

const NewsDetails = () => {
    const { id } = useParams();  // Get the ID from the URL
    const newsItem = newsData.find((news) => news.id === Number(id)); //compare this ID

    if (!newsItem) {
        return <h2>News not found</h2>;
    }

    return (
        <div className="News_Details_Container">

            <Link to = "/news" className="News_Back_Container">
                <i className="fa-solid fa-arrow-left"></i>
                <p>Creeper New</p>
            </Link>
        
        
            <div className="News_Details_Item">

                <div className="Tite_Container_Details">
                    <h2 className="new-title_Details">{newsItem.Title}</h2>
                </div>

                <div className="Date_Conatainer_Details">
                    <p className="new_Date_Details">{newsItem.Date}</p>
                </div>

                <div className="Sumary_Container_Details">
                    <p className="news-sumary-Heading">Sumary: </p>
                    <p className="news-sumary_Details">{newsItem.Sumary}</p>
                </div>

                <div className="Image_Container_Details">
                    <img src={newsItem.Image} alt={newsItem.Title}></img>
                </div>

                <div className="News_Content_Details">
                    {newsItem.renderContent()}
                </div>
            </div>

        </div>
    );
};

export default NewsDetails;