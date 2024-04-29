import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Upcoming = () => {
  const [movies, setMovies] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const fetchMovies = () => {
    axios
      .get("http://localhost:8080/api/v1/movies/get-movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []); // Fetch movies when component mounts

  const handleSortByReleaseDate = () => {
    if (!isSorted) {
      const sortedMovies = [...movies].sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
      setMovies(sortedMovies);
      setIsSorted(true);
    } else {
      fetchMovies();
      setIsSorted(false);
    }
  };

  const today = new Date();
  const filteredMovies = movies.filter(
    (movie) => new Date(movie.release_date) >= today
  );

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Upcoming Movies</span>
        <p style={{ color: "wheat", backgroundColor: 'black', cursor: 'pointer' }} onClick={handleSortByReleaseDate}>
          {isSorted ? "Unsort Movies" : "Sort By Release Date"}
        </p>
      </ContentWrapper>

      {filteredMovies.length > 0 ? (
        <Carousel data={filteredMovies} />
      ) : (
        <ContentWrapper>
          <p style={{ color: "white" }}>No upcoming movies available</p>
        </ContentWrapper>
      )}
    </div>
  );
};

export default Upcoming;
