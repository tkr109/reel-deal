  import React, { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import useFetch from "../../hooks/useFetch";
  import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
  import Trending from "../home/trending/Trending";
  import Img from "../../components/lazyLoadImage/Img";
  import Genres from "../../components/genres/Genres";
  import styled, { css, keyframes } from "styled-components";
  import "../../mixins.scss";
  import CircleRating from "../../components/circleRating/CircleRating";
  import dayjs from "dayjs";
  import { PlayIcon } from "../details/Playbtn";
  import "./theatre.css";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../components/helper";

  // Mixin functions
  const sm = (styles) => css`
    @media only screen and (min-width: 640px) {
      ${styles}
    }
  `;

  const md = (styles) => css`
    @media only screen and (min-width: 768px) {
      ${styles}
    }
  `;

  const lg = (styles) => css`
    @media only screen and (min-width: 1024px) {
      ${styles}
    }
  `;

  const xl = (styles) => css`
    @media only screen and (min-width: 1280px) {
      ${styles}
    }
  `;

  const xxl = (styles) => css`
    @media only screen and (min-width: 1536px) {
      ${styles}
    }
  `;

  const ellipsis = (line = 2) => css`
    display: -webkit-box;
    -webkit-line-clamp: ${line};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  `;

  const DetailsBanner = styled.div`
    width: 100%;
    background-color: var(--black);
    padding-top: 100px;
    margin-bottom: 50px;

    ${md`
      margin-bottom: 0;
      padding-top: 120px;
      min-height: 700px;
    `}
  `;

  const BackdropImg = styled.div`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.1;
    overflow: hidden;
  `;

  const LazyLoadImageBackground = styled.div`
    width: 100%;
    height: 100%;
  `;

  const LazyLoadImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  `;

  const OpacityLayer = styled.div`
    width: 100%;
    height: 250px;
    background: linear-gradient(180deg, rgba(4, 21, 45, 0) 0%, #04152d 79.17%);
    position: absolute;
    bottom: 0;
    left: 0;
  `;

  const Content = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    gap: 25px;
    margin-left: 190px;
    margin-right: 190px;

    ${md`
      gap: 50px;
      flex-direction: row;
    `}
  `;

  const Left = styled.div`
    flex-shrink: 0;
  `;

  const PosterImg = styled(Img)`
    width: 100%;
    display: block;
    border-radius: 12px;

    ${md`
      max-width: 350px;
    `}
  `;

  const Right = styled.div`
    color: white;
  `;

  const Title = styled.div`
    font-size: 28px;
    line-height: 40px;

    ${md`
      font-size: 34px;
      line-height: 44px;
    `}
  `;

  const Subtitle = styled.div`
    font-size: 16px;
    line-height: 24px;
    margin-bottom: 15px;
    font-style: italic;
    opacity: 0.5;

    ${md`
      font-size: 20px;
      line-height: 28px;
    `}
  `;

  const CircleRatingStyle = styled.div`
    max-width: 70px;

    ${md`
      max-width: 90px;
    `}

    .CircularProgressbar-text {
      fill: white;
    }
  `;

  const RowContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 25px;
    margin-bottom: 25px;
  `;

  const InfoContainer = styled.div`
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 15px 0;
    display: flex;

    .infoItem {
      margin-right: 10px;
      display: flex;
      flex-flow: row wrap;
    }

    .text {
      margin-right: 10px;
      opacity: 0.5;
      line-height: 24px;

      &.bold {
        font-weight: 600;
        opacity: 1;
      }
    }
  `;

  const trailorPlay = keyframes`
    to {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  `;

  const PlayButtonStyle = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    cursor: pointer;

    svg {
      width: 60px;

      ${md`
        width: 80px;
      `}
    }

    .text {
      font-size: 20px;
      transition: all 0.7s ease-in-out;
    }

    .triangle {
      stroke-dasharray: 240;
      stroke-dashoffset: 480;
      stroke: white;
      transform: translateY(0);
      transition: all 0.7s ease-in-out;
    }

    .circle {
      stroke: white;
      stroke-dasharray: 650;
      stroke-dashoffset: 1300;
      transition: all 0.5s ease-in-out;
    }

    &:hover {
      .text {
        color: var(--pink);
      }

      .triangle {
        stroke-dashoffset: 0;
        opacity: 1;
        stroke: var(--pink);
        animation: ${trailorPlay} 0.7s ease-in-out;
      }

      .circle {
        stroke-dashoffset: 0;
        stroke: var(--pink);
      }
    }
  `;

  const Theatre = () => {
    const { mediaType, id } = useParams();
    const [movie, setMovie] = useState([]);
    const navigate = useNavigate();

    const getMovie = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}api/v1/movies/get-movie/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details.");
        }
        const movieData = await response.json();
        setMovie(movieData); // Store movie details in the state
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    const [theatre, setTheatres] = useState([]);

    useEffect(() => {
      // Retrieve the user data from localStorage
      const userData = JSON.parse(localStorage.getItem("user"));

      if (userData && userData.city) {
        const userCity = userData.city;

        axios
          .get(
            `${BASE_URL}api/v1/theaters/get-theaters-for-movie/${id}`
          )
          .then((response) => {
            // Filter theaters based on matching city
            const filteredTheatres = response.data.filter(
              (theatre) => theatre.city === userCity
            );
            setTheatres(filteredTheatres);
          })
          .catch((error) => {
            console.error("Error fetching theaters:", error);
          });
      } else {
        console.error("User data or user city not found in localStorage");
      }
    }, [id]);

    useEffect(() => {
      getMovie();
    }, []);

    console.log("Theatres are", theatre);

    const toHoursAndMinutes = (totalMinutes) => {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    const openNewTab = () => {
      window.open("https://youtube.com/", "_blank");
    };  

    const handleDateChange = (event) => {
      const selectedDate = event.target.value;
      setSelectedDate(selectedDate);
    };

    const releaseDate = new Date(movie.release_date);
var today = new Date().toISOString().slice(0, 10);
const [selectedDate, setSelectedDate] = useState(today);


    // Create a Date object representing the current date and time
    const currentDate = new Date();

    const isReleased = releaseDate <= currentDate;

    const sampleData = [28, 17, 16, 35, 80, 18];

    const isLoading = !movie || !theatre;

if (isLoading) {
    return <div>Loading...</div>;
}

    return (
      <DetailsBanner>
        <BackdropImg>
          <LazyLoadImageBackground>
            <LazyLoadImage src={movie.poster_path} />
          </LazyLoadImageBackground>
        </BackdropImg>
        <OpacityLayer />
        <Content>
          <Left>
            <PosterImg src={movie.poster_path} />
          </Left>
          <Right>
            <Title>{movie.title}</Title>
            <Genres data={sampleData} />

            <RowContainer></RowContainer>
            <InfoContainer>
              <div className="infoItem">
                <span className="text bold">Status: </span>
                <span className="text">
                  {isReleased ? "Released" : "Not Released"}
                </span>
              </div>
              <div className="infoItem">
                <span className="text bold">Release Date: </span>
                <span className="text">
                  {dayjs(movie.release_date).format("MMM D, YYYY")}
                </span>
              </div>
              <div className="infoItem">
                <span className="text bold">Runtime: </span>
                <span className="text">{toHoursAndMinutes(movie.runtime)}</span>
              </div>
            </InfoContainer>
            <label className="date-label">Select Date:</label>
            <input
              type="date"
              onChange={handleDateChange}
              value={selectedDate}
              className="date-input"
              min={today} // Set the minimum date to today
            />
            <InfoContainer>
  <div className="info">
  {theatre.length === 0 ? (
  <div className="text">No theaters available for this movie in your city.</div>
) : (
  theatre.map((theatreItem, index) => (
    <div key={index} className="theatre-container" style={{marginTop:"20px"}}>
      <span className="text bold">{theatreItem.name}</span>
      <div className="info">
        {theatreItem.timings && theatreItem.timings[0] ? (
          theatreItem.timings[0].map((timing, index) => (
            <span
              key={index}
              className="text-bold"
              onClick={() => {
                const theatreName = theatreItem.name;
                const price = theatreItem.capacity;
                console.log(theatreItem.capacity);
                navigate(
                  `/Movie/${id}/theatre/${theatreName}/${timing}/${selectedDate}/${price}`
                );
              }}
            >
              {timing}
            </span>
          ))
        ) : (
          <div className="text" style={{marginTop:"15px"}}>No shows  available.</div>
        )}
      </div>
    </div>
  ))
)}
  </div>
</InfoContainer>
          </Right>
        </Content>
        <Trending style={{ marginTop: "100px" }} />
      </DetailsBanner>
    );
  };

  export default Theatre;
