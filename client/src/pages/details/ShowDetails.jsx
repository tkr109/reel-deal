import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import Trending from "../home/trending/Trending"
import Img from "../../components/lazyLoadImage/Img";
import Genres from "../../components/genres/Genres";
import styled, { css, keyframes } from "styled-components";
import "../../mixins.scss";
import CircleRating from "../../components/circleRating/CircleRating";
import dayjs from "dayjs";
import { PlayIcon } from "./Playbtn";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
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


const ShowDetails = () => {
  const { mediaType, id } = useParams();
  const [movie, setMovie] = useState([]);
  const navigate=useNavigate()
  const nextPage=()=>{
    navigate(`/Movie/${id}/theatre`)
  }

  const getShow = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}api/v1/shows/get-show/${id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch show details.");
      }
      const movieData = await response.json();
      setMovie(movieData);
      console.log(movieData) // Store movie details in the state
    } catch (error) {
      console.error("Error fetching show details:", error);
    }
  };


  useEffect(() => {
    getShow();
  }, []);

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const openNewTab = () => {
    window.open(movie.trailer_link, "_blank");
  };
  const releaseDate = new Date(movie.release_date);

  // Create a Date object representing the current date and time
  const currentDate = new Date();

  const isReleased = 1;

  const sampleData = [28, 17, 16, 35, 80, 18];
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
          <Subtitle css={ellipsis(3)}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
            sint ipsam voluptas officiis soluta aspernatur magnam deleniti, sit
            laborum cum itaque alias blanditiis ipsum inventore nam quas, quidem
            voluptatum voluptates. Ut enim saepe voluptatum, eius, sed explicabo
            illum cupiditate ratione eligendi veritatis id quisquam eos. Ut, ad
            dignissimos, vel   frgfd
          </Subtitle>
          <RowContainer>
            <CircleRatingStyle>
              <CircleRating rating={movie.vote_average} />
            </CircleRatingStyle>
          </RowContainer>
          <InfoContainer>
            <div className="infoItem">
              <span className="text bold">Status: </span>
              <span className="text">{isReleased ? 'Released' : 'Not Released'}</span>
            </div>
            <div className="infoItem">
              <span className="text bold">Release Date: </span>
              <span className="text">
                {dayjs(movie.release_date).format("MMM D, YYYY")}
              </span>
            </div>
          </InfoContainer>
          <InfoContainer>
            <div className="infoItem">
              <span className="text bold">Runtime: </span>
              <span className="text">{toHoursAndMinutes(movie.runtime)}</span>
            </div>
            <div className="info">
              <span className="text bold">Director: </span>
              <span className="text">{movie.director}</span>
            </div>
          </InfoContainer>
          {isReleased && <div className="d-inline-block" tabIndex="0" data-toggle="tooltip" title="Bookings will start after the movie gets released">
          <button
            type="button"
            className="btn btn-warning disabled"
            style={{ width: "200px" }}
            onClick={nextPage}
          >
            <b>
              Book Now
              <FontAwesomeIcon icon={faTicket} style={{ marginLeft: "15px" }} />
            </b>
          </button>
        </div>
}         
          {!isReleased && <span className="d-inline-block" tabindex="0" data-toggle="tooltip" title="Bookings will start after the movie gets released">
<button type="button" class="btn btn-warning disabled" style={{ width: '200px' }} onClick={nextPage}><b>Book Now <FontAwesomeIcon icon={faTicket} style={{ marginLeft: '15px' }} /> </b></button></span>
}         

        </Right>
      </Content>
      <Trending style={{ marginTop: "100px" }} />
    </DetailsBanner>
  );
};

export default ShowDetails;
