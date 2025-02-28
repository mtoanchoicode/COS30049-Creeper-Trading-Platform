import {React, useContext} from "react";
import { Link } from "react-router-dom";
import "./NewsComponent.css"
import { NewsContext } from "../../../contexts/NewsContext";

const News = () => {
    const {newsData} = useContext(NewsContext);

    console.log(newsData)

    return (
        <section className="News-container">
            <div className="News-heading-container">
                <h2 className="News-heading-title">
                    News
                </h2>

                <Link to="/news">
                    <p className="News-Link">View all news</p>
                </Link>
            </div>

            <div className="News-Content-Container">
                {newsData?.slice(-4).map((New, index) => {
                    return (
                        <div
                        key = {index} 
                        className="News-Content">
                            <Link
                                to={`/news/${New.id}`}
                                className="News-details-heading">
                                {New.Title}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default News