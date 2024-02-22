import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        // Change the image every 5 seconds
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % img_arr.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const img_arr = [
        "https://assets-in.bmscdn.com/promotions/cms/creatives/1698931897748_mindfoolvirdasdesktop.jpg",
        "https://assets-in.bmscdn.com/promotions/cms/creatives/1698603955302_web.jpg",
        "https://assets-in.bmscdn.com/promotions/cms/creatives/1700662585307_cocacolachandigarhiscooking1240x300.jpg"
    ];

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            <div className="backdrop-img">
                <div className="image-change">
                    <Img src={img_arr[currentImageIndex]} />
                </div>
            </div>

            <div className="opacity-layer" style={{marginBottom:"0px"}}></div>  
        </div>
    );
};

export default HeroBanner;
