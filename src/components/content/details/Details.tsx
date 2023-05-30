import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';

import Rating from '../rating/Rating';
import Tabs from './tabs/Tabs';
import Overview from './overview/Overview';
import Crew from './crew/Crew';
import Media from './media/Media';
import Reviews from './reviews/Reviews';
import Spinner from '../../spinner/Spinner';

import { IMAGE_URL } from '../../../services/movies.service';
import { BackdropItemType, CastItemType, CrewItemType, Genre, LogoItemType, Movie, PosterItemType, ReviewItemType, VideoItemType, } from '../../../redux/types/MovieType';

import { MovieData } from '../../../redux/movie'
const Details = () => {
  const { movie, loading } = useSelector((state: RootState) => state.movie);

  console.log(movie, 'movie');

  const defaultDetails = movie[0] as MovieData
  const castAndCrewDetails = movie[1] as MovieData
  const imageDetails = movie[2] as MovieData
  const videoDetails = movie[3] as MovieData
  const reviewDetails = movie[4] as MovieData
  return (
    <>
      {loading ? (
        <Spinner />
      ) : movie?.length !== 0 ? (
        <div className="movie-container">
          <div className="movie-bg" style={{ backgroundImage: `url(${IMAGE_URL}${defaultDetails.backdrop_path})` }}></div>

          <div className="movie-overlay"></div>

          <div className="movie-details">

            <div className="movie-image">
              <img src={`${IMAGE_URL}${defaultDetails.poster_path}`} alt="" />
            </div>

            <div className="movie-body">

              <div className="movie-overview">
                <div className="title">
                  {defaultDetails?.title} <span>{defaultDetails?.release_date}</span>
                </div>

                <div className="movie-genres">
                  <ul className="genres">
                    {defaultDetails?.genres?.map((genre: Genre) => (
                      <li key={genre.id}>{genre.name}</li>
                    ))}
                  </ul>
                </div>

                <div className="rating">
                  <Rating
                    className="rating-stars"
                    rating={defaultDetails?.vote_average}
                    totalStars={10} />
                  &nbsp;
                  <span>{defaultDetails?.vote_average}</span>
                  <p>({defaultDetails?.vote_count}) reviews</p>
                </div>

                <Tabs>
                  <div>
                    <Overview
                      details={defaultDetails}
                      credits={castAndCrewDetails} />
                  </div>
                  <div>
                    <Crew
                      crew={castAndCrewDetails} />
                  </div>
                  <div>
                    <Media
                      media={imageDetails}
                      videos={videoDetails} />
                  </div>
                  <div>
                    <Reviews
                      reviews={reviewDetails} />
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Details;
