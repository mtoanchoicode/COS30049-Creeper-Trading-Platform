import {React} from "react";
import { Link } from "react-router-dom";
import "./NewsComponent.css"

const News = (props) => {
    return (
        <div
        key = {props.id} 
        className="News-Content">
            <Link
                to={`/news/${props.id}`}
                className="News-details-heading">
                {props.Title}
            </Link>
        </div>
    )
}

export default News