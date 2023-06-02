import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

import Rating from '../rating/Rating';
import { IMAGE_URL } from '../../../services/movies.service';
import LazyImage from '../../lazyImage/LazyImage';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux';
import { MovieList } from '../../../redux/types';
import { movieDetails, setLoading } from '../../../redux/movie';

type SearchResultType = {
  searchResult: MovieList[];
};
const SearchResult = ({ searchResult }: SearchResultType) => {
  const history = useNavigate();

  const { searchQuery } = useSelector(
    (state: RootState) => state.movie
  );
  const [movieData, setMovieData] = useState<MovieList[]>([]);

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

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
    <div className="searchKeyword">
      <div className="grid-search-title">
        <span className="grid-text1">Your search keyword:</span>{' '}
        <span className="grid-text2">{searchQuery}</span>
      </div>
      <div className="grid">
        {movieData?.map((data: MovieList) => (
          <div
            onClick={() => fetchMovieDetail(data.id, data.title)}
            key={uuidv4()}
          >
            <Fragment>
              {data?.poster_path && (
                <LazyImage
                  className="grid-cell"
                  src={`${IMAGE_URL}${data.poster_path}`}
                >
                  <div className="grid-read-more"></div>
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
              )}
            </Fragment>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
