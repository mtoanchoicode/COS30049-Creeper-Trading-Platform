import React from "react";
import { Link } from "react-router-dom";
import "./NewsComponent.css"
import news from "../../News-Page/NewsData"


const News = () => {
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
                {news?.slice(-4).map((New) => {
                    return (
                        <div className="News-Content">
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