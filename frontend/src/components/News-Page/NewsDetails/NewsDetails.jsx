import { Link, useParams } from "react-router-dom";
import { useContext } from "react";
import "./NewsDetails.css";
import DOMPurify from "dompurify";
import { NewsContext } from "../../../contexts/NewsContext";



const NewsDetails = () => {
    const {newsData} = useContext(NewsContext);

    const { id } = useParams();  // Get the ID from the URL
    const newsItem = newsData.find((news) => news.id === Number(id)); //compare this ID

    if (!newsItem) {
        return <h2>News not found</h2>;
    }

    const sanitizedHTML = DOMPurify.sanitize(newsItem.Content, {
        ALLOWED_TAGS: ['b', 'i', 'strong', 'em', 'p', 'h1', 'h2', 'h3', 'h4', 'ul', 'li', 'img', 'div'], // Allowed tags
      });

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
                    <p className="new_Date_Details">{new Date(newsItem.Date).toLocaleDateString("en-CA")}</p>
                </div>

                <div className="Sumary_Container_Details">
                    <p className="news-sumary-Heading">Sumary: </p>
                    <p className="news-sumary_Details">{newsItem.Sumary}</p>
                </div>

                <div className="Image_Container_Details">
                    <img src={newsItem.Image} alt={newsItem.Title}></img>
                </div>

                <div className="News_Content_Details" dangerouslySetInnerHTML={{ __html: sanitizedHTML }}>
                    {console.log(newsItem.Content)}
                </div>
            </div>

        </div>
    );
};

export default NewsDetails;