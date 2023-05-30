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
import {
  Genre,
  MediaType,
  ReviewItemType,
  VideoType,
  primaryDetailsType,
  secondaryDetailsType
} from '../../../redux/types/MovieType';

const Details = () => {
  const { movie, loading } = useSelector((state: RootState) => state.movie);

  const movieDetails = movie[0] as primaryDetailsType;

  const secondaryDetails: secondaryDetailsType =
    movie[1] as secondaryDetailsType;

  const imageDetails = movie[2] as MediaType;

  const videoDetails: VideoType = movie[3] as VideoType;

  const reviewDetails: ReviewItemType = movie[4] as ReviewItemType;

  return (
    <>
      {loading ? (
        <Spinner />
      ) : movie?.length !== 0 ? (
        <div className="movie-container">
          <div
            className="movie-bg"
            style={{
              backgroundImage: `url(${IMAGE_URL}${movieDetails.backdrop_path})`
            }}
          ></div>

          <div className="movie-overlay"></div>

          <div className="movie-details">
            <div className="movie-image">
              <img src={`${IMAGE_URL}${movieDetails.poster_path}`} alt="" />
            </div>

            <div className="movie-body">
              <div className="movie-overview">
                <div className="title">
                  {movieDetails?.title}{' '}
                  <span>{movieDetails?.release_date}</span>
                </div>

                <div className="movie-genres">
                  <ul className="genres">
                    {movieDetails?.genres?.map((genre: Genre) => (
                      <li key={genre.id}>{genre.name}</li>
                    ))}
                  </ul>
                </div>

                <div className="rating">
                  <Rating
                    className="rating-stars"
                    rating={movieDetails?.vote_average}
                    totalStars={10}
                  />
                  &nbsp;
                  <span>{movieDetails?.vote_average}</span>
                  <p>({movieDetails?.vote_count}) reviews</p>
                </div>

                <Tabs>
                  <div>
                    <Overview
                      details={movieDetails}
                      credits={secondaryDetails}
                    />
                  </div>
                  <div>
                    <Crew crew={secondaryDetails} />
                  </div>
                  <div>
                    <Media media={imageDetails} videos={videoDetails} />
                  </div>
                  <div>
                    <Reviews reviews={reviewDetails} />
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
