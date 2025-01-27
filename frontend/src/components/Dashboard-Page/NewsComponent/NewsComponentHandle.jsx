import React from "react";
import { Link } from "react-router-dom";
import "./NewsComponent.css"


const News = ({ News, title }) => {
    return (
        <section className="News-container">
            <div className= "News-heading-container">
                <h1 className="News-heading-title">
                    {title}
                </h1>

                <Link to="/">
                    <p className="News-Link">View all news</p>
                </Link>
            </div>

            <div className="News-Content-Container">
                {News?.map((New) => {
                    return (
                        <div className="News-Content">
                            <a 
                            href = ""
                            className="News-details-heading">
                                {New.NewTitle}
                            </a>
                        </div>
                    )
                })}          
            </div>
        </section>
    )
}

export default News