import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Upcoming = () => {
    const [movies, setMovies] = useState([]);

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
        const updateMoviesInterval = setInterval(fetchMovies, 1000);
        return () => {
            clearInterval(updateMoviesInterval);
        };
    }, []);

    // Filter movies based on release date equal to or less than today
    const today = new Date();
    const filteredMovies = movies.filter((movie) => new Date(movie.release_date) >= today);

    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">Upcoming Movies</span>
            </ContentWrapper>
            
            {filteredMovies.length > 0 ? (
                <Carousel data={filteredMovies} /> // Display filtered movies in the carousel
            ) : (
                <ContentWrapper>
                    <p style={{color:"white"}}>No upcoming movies available</p>
                </ContentWrapper>
            )}
        </div>
    );
};

export default Upcoming;
