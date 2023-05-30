import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

import Rating from '../rating/Rating';
import { IMAGE_URL } from '../../../services/movies.service';
import LazyImage from '../../lazyImage/LazyImage';

const SearchResult = (props: any) => {
  const { searchResult, searchQuery } = props;
  const [movieData, setMovieData] = useState([]);

  console.log(searchResult, 'searchResult');

  useEffect(() => {
    setMovieData(searchResult);
  }, [searchResult]);

  const formatMovieTitle = (title: string) => {
    const titleStr = title.toLowerCase();
    return titleStr.replace(/ /g, '-');
  };

  return (
    <div className="searchKeyword">
      <div className="grid-search-title">
        <span className="grid-text1">Your search keyword:</span>{' '}
        <span className="grid-text2">{searchQuery}</span>
      </div>
      <div className="grid">
        {movieData?.map((data: any) => (
          <Fragment key={uuidv4()}>
            {data?.poster_path && (
              <LazyImage
                className="grid-cell"
                src={`${IMAGE_URL}${data.poster_path}`}
                alt="placeholder"
              >
                <div className="grid-read-more">
                  <button className="grid-cell-button">
                    <Link
                      to={`/${data.id}/${formatMovieTitle(data.title)}/details`}
                    >
                      Read More
                    </Link>
                  </button>
                </div>
                <div className="grid-detail">
                  <span className="grid-detail-title">{data.title}</span>
                  <div className="grid-detail-rating">
                    <Rating rating={data.vote_average} totalStars={10} />
                    &nbsp;&nbsp;
                    <div className="grid-vote-average">{data.vote_average}</div>
                  </div>
                </div>
              </LazyImage>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SearchResult;
