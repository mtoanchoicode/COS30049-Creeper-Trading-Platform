import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const NewsContext = createContext();

const NewsProvider = ({ children }) => {
    const [newsData, setNewsData] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/v1/api/news") 
            .then(response => {
                setNewsData(response.data);
            })
            .catch(error => {
                console.error("Error fetching news:", error);
            });

            // axios.get(`${API_BASE_URL}/v1/api/news`) // Fetch news from backend
            //.then(response => setNewsData(response.data))
            //.catch(error => console.error("Error fetching news:", error));
    }, []);

    return (
        <NewsContext.Provider value={{ newsData }}>
            {children}
        </NewsContext.Provider>
    );
};

export default NewsProvider;