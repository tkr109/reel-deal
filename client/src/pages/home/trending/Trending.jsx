import React, { useEffect, useState } from "react";
import axios from "axios";
import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./treanding.css";
import { BASE_URL } from "../../../components/helper";

const Trending = () => {
  const [movies, setMovies] = useState([]);
  const [isSorted, setIsSorted] = useState(false);

  const fetchMovies = () => {
    axios
      .get(`${BASE_URL}api/v1/movies/get-movies`)
      .then((response) => {
        setMovies(response.data);
        console.log(response.data)
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  const fetchMoviesSorted = () => {
    axios
      .get(`${BASE_URL}api/v1/movies/get-movies-sorted`)
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
        <div
          className="app__trending-sorting"
          onClick={handleSortByReleaseDate}
        >
          <p className="app__sorting-text">
            {isSorted ? "Unsort Movies" : "Sort By Release Date"}
          </p>
          <div>
            <label for="burger" class="burger">
              <input id="burger" type="checkbox" onClick={handleSortByReleaseDate} checked={isSorted?true:false} />
              <span></span>
              <span></span>
              <span></span>
            </label>
          </div>
        </div>
      </ContentWrapper>
      <Carousel data={filteredMovies} />
    </div>
  );
};

export default Trending;
