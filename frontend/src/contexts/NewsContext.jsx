import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const NewsContext = createContext();

const NewsProvider = ({ children }) => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/v1/api/news`);
                setNewsData(response.data);
            } catch (err) {
                console.error("Error fetching news:", err);
            } finally {
                setLoading(false); // Stop loading when fetch completes
            }
        };

        fetchNews();
    }, []);

    return (
        <NewsContext.Provider value={{ newsData, loading }}>
            {children}
        </NewsContext.Provider>
    );
};

export default NewsProvider;