import React, { useState, useEffect } from "react";
import axios from "axios";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import { useNavigate } from "react-router-dom";

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/v1/shows/get-shows`); // Use your API endpoint URL
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Movies" ? "movie" : "tv");
    };

    return (
        <div className="carouselSection">
        <ContentWrapper>
          <span className="carouselTitle">Popular Events</span>
        </ContentWrapper>
        <Carousel data={data} loading={loading} onClick={(i) => {navigate(`shows/book/${data[i].id}`),console.log(data)}} />
      </div>
    );
};

export default Popular;
