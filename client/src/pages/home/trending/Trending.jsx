import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const Trending = () => {
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

  const fetchMoviesSorted = () => {
    axios
      .get("http://localhost:8080/api/v1/movies/get-movies-sorted")
      .then((response) => {
        setMovies(response.data);
        setIsSorted(true);
      })
      .catch((error) => {
        console.error("Error fetching sorted movies:", error);
      });
  };

  const handleSortByReleaseDate = () => {
    if (!isSorted) {
      fetchMoviesSorted();
    } else {
      fetchMovies();
      setIsSorted(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const today = new Date();
  const filteredMovies = movies.filter(
    (movie) => new Date(movie.release_date) <= today
  );

  return (
    <div className="carouselSection">
      <ContentWrapper>
        <span className="carouselTitle">Trending Movies</span>
        <p
          style={{
            color: "wheat",
            backgroundColor: "black",
            cursor: "pointer",
          }}
          onClick={handleSortByReleaseDate}
        >
          {isSorted ? "Unsort Movies" : "Sort By Release Date"}
        </p>
      </ContentWrapper>
      <Carousel data={filteredMovies} />
    </div>
  );
};

export default Trending;
