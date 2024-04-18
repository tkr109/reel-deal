import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

import Img from "../../../components/lazyLoadImage/Img";
import banner from "../../../assets/banner2.png";

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
        "../../../assets/banner2",
        "../../../assets/banner1"
    ];

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            <div className="backdrop-img">
                <div className="image-change" style={{margin:"3.8rem 0rem"}}>
                    <img src={banner} />
                </div>
            </div>

            <div className="opacity-layer" style={{marginBottom:"0px"}}></div>  
        </div>
    );
};

export default HeroBanner;
