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

                <Link to="/">
                    <p className="News-Link">View all news</p>
                </Link>
            </div>

            <div className="News-Content-Container">
                {news?.slice(0, 4).map((New) => {
                    return (
                        <div className="News-Content">
                            <a
                                href=""
                                className="News-details-heading">
                                {New.Title}
                            </a>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default News