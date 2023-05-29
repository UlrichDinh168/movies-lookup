import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

import Rating from './Rating';
import Tabs from './Tabs';
import Overview from './Overview';
import Crew from './Crew';
import Media from './Media';
import Reviews from './Reviews';
import Spinner from './Spinner';

import { movieDetails } from '../redux/movie';
import { _pathURL } from '../redux/route';
import { IMAGE_URL } from '../services/movies.service';

const Details = () => {

  const { movie } = useSelector((state: RootState) => state.movie)
  const [details, setDetails] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const location = useLocation();

  const name = async () => {
    try {
      await setLoading(true);

      await _pathURL(location.pathname, location.pathname);
      if (movie.length === 0 && id !== undefined) {
        await movieDetails(id);
      }
      setDetails(movie[0]);
    } catch (error) {
      console.log(error);

    } finally {
      setLoading(false);
    }

  }

  useEffect(() => {
    name()
    // eslint-disable-next-line
  }, [id, movie]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        details?.length !== 0 ? (
          <div className="movie-container">
            <div className="movie-bg" style={{ backgroundImage: `url(${IMAGE_URL}${details?.backdrop_path})` }}></div>
            <div className="movie-overlay"></div>
            <div className="movie-details">
              <div className="movie-image">
                <img src={`${IMAGE_URL}${details?.poster_path}`} alt="" />
              </div>
              <div className="movie-body">
                <div className="movie-overview">
                  <div className="title">
                    {details?.title} <span>{details?.release_date}</span>
                  </div>
                  <div className="movie-genres">
                    <ul className="genres">
                      {details?.genres?.map((genre: any) => (
                        <li key={genre.id}>{genre.name}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rating">
                    <Rating className="rating-stars" rating={details?.vote_average} totalStars={10} />
                    &nbsp;
                    <span>{details?.vote_average}</span> <p>({details?.vote_count}) reviews</p>
                  </div>
                  <Tabs>
                    <div>
                      <Overview movie={movie} />
                    </div>
                    <div>
                      <Crew movie={movie} />
                    </div>
                    <div>
                      <Media movie={movie} />
                    </div>
                    <div>
                      <Reviews movie={movie} />
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        ) : null
      )}
    </>
  );
};



export default Details;