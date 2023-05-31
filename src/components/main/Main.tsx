import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

import MainContent from '../content/mainContent/MainContent';
import Spinner from '../spinner/Spinner';
import {
  loadMoreMovies,
  setResponsePageNumber
} from '../../redux/movie';
import { pathURL } from '../../redux/route';
import SearchResult from '../content/searchResult/SearchResult';

const Main = () => {
  const { page, totalPages, searchResult, movieType, loading } =
    useSelector((state: RootState) => state.movie);

  const { message, statusCode } = useSelector(
    (state: RootState) => state.error
  );

  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const bottomLineRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();
  const useEffectRan = useRef(false);

  useEffect(() => {
    if (useEffectRan.current === false) {
      pathURL(location.pathname, location.pathname);
      setResponsePageNumber(currentPage, totalPages);
    }

    return () => {
      useEffectRan.current = true;
    };
  }, [currentPage, totalPages]);

  const fetchData = () => {
    let pageNumber = currentPage;
    if (page < totalPages) {
      pageNumber += 1;
      setCurrentPage(pageNumber);
      loadMoreMovies(movieType, pageNumber);
    }
  };

  const handleScroll = () => {
    const containerHeight =
      mainRef.current?.getBoundingClientRect().height;
    const _bottomLineRef = bottomLineRef.current;

    if (
      containerHeight !== undefined &&
      _bottomLineRef !== undefined &&
      _bottomLineRef !== null
    ) {
      const { top: bottomLineTop } =
        _bottomLineRef.getBoundingClientRect();
      bottomLineTop <= containerHeight && fetchData();
    }
  };

  return (
    <>
      {!message && !statusCode && (
        <div className="main" ref={mainRef} onScroll={handleScroll}>
          {loading ? (
            <Spinner />
          ) : (
            <>
              {searchResult?.length === 0 ? (
                <MainContent />
              ) : (
                <SearchResult />
              )}
            </>
          )}
          <div ref={bottomLineRef}></div>
        </div>
      )}
    </>
  );
};

export default Main;
