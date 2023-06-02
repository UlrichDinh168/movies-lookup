import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';

import Rating from '../rating/Rating';
import { IMAGE_URL } from '../../../services/movies.service';
import LazyImage from '../../lazyImage/LazyImage';
import { movieDetails, setLoading } from '../../../redux/movie';
import { MovieList } from '../../../redux/types';

const Grid = () => {
  const history = useNavigate();

  const { list } = useSelector((state: RootState) => state.movie);
  const [movieData, setMovieData] = useState<MovieList[]>([]);

  useEffect(() => {
    setMovieData(list);
  }, [list]);

  const formatMovieTitle = (title: string) => {
    const titleStr = title.toLowerCase();
    return titleStr.replace(/ /g, '-');
  };

  const fetchMovieDetail = async (id: number, title: string) => {
    try {
      setLoading(true);
      await movieDetails(id);
      history(`/${id}/${formatMovieTitle(title)}/details`);
    } catch (error) {
      throw Error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="grid">
        {movieData?.map((data: MovieList) => (
          <div className='grid-container' key={uuidv4()} onClick={() =>
            fetchMovieDetail(data.id, data.title)
          }>
            <LazyImage
              className="grid-cell"
              src={`${IMAGE_URL}${data.poster_path}`}
              alt="placeholder"
            >
              {/* <div className="grid-read-more">
                <button
                  className="grid-cell-button"
                  onClick={() =>
                    fetchMovieDetail(data.id, data.title)
                  }
                >
                  <Link to={`/${data.id}/${formatMovieTitle(data.title)}/details`}>Read More</Link>
                  Read more
                </button>
              </div> */}
              <div className="grid-detail">
                <span className="grid-detail-title">
                  {data.title}
                </span>
                <div className="grid-detail-rating">
                  <Rating
                    rating={data.vote_average}
                    totalStars={10}
                  />
                  &nbsp;&nbsp;
                  <div className="grid-vote-average">
                    {data.vote_average}
                  </div>
                </div>
              </div>
            </LazyImage>
          </div>
        ))}
      </div>
    </>
  );
};

export default Grid;
