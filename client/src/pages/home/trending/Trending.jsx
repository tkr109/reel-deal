import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from "../../../components/switchTabs/SwitchTabs";
import Popular from "../popular/Popular";

const Trending = () => {
    const [endpoint, setEndpoint] = useState("day");
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);

    const onTabChange = (tab) => {
        setEndpoint(tab === "Day" ? "day" : "week");
    };

    const fetchMovies = () => {
        axios.get('http://localhost:8080/api/v1/movies/get-movies')
            .then((response) => {
                setMovies(response.data);
            })
            .catch((error) => {
                console.error('Error fetching movies:', error);
            });
    };

    useEffect(() => {
        fetchMovies();
        // const updateMoviesInterval = setInterval(fetchMovies, 1000);
        // return () => {
        //     clearInterval(updateMoviesInterval);
        // };
    }, [1]);

    // Filter movies based on release date equal to or less than today
    const today = new Date();
    const filteredMovies = movies.filter((movie) => new Date(movie.release_date) <= today);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Trending Movies</span>
            </ContentWrapper>
            <Carousel data={filteredMovies} /> {/* Display filtered movies in the carousel */}
        </div>
    );
};

export default Trending;
