import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux';

import MainContent from './MainContent';
import Spinner from './Spinner';
import { loadMoreMovies, setResponsePageNumber } from '../redux/movie';
import { _pathURL, } from '../redux/route';
import SearchResult from './SearchResult';

const Main = () => {

  const { page, totalPages, searchResult, movieType } = useSelector((state: RootState) => state.movie)
  const { message, statusCode } = useSelector((state: RootState) => state.error)

  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(page);
  const mainRef = useRef<HTMLDivElement | null>(null);
  const bottomLineRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    _pathURL(location.pathname, location.pathname);
    setResponsePageNumber(currentPage, totalPages);
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
    const containerHeight = mainRef.current?.getBoundingClientRect().height;
    const _bottomLineRef = bottomLineRef.current

    if (containerHeight !== undefined && _bottomLineRef !== undefined && _bottomLineRef !== null) {
      const { top: bottomLineTop } = _bottomLineRef.getBoundingClientRect();
      (bottomLineTop <= containerHeight) && fetchData();
    }
  }

  return (
    <>
      {!message && !statusCode && (
        <div className="main" ref={mainRef} onScroll={handleScroll}>
          {loading ? (
            <Spinner />
          ) : (
            <>{searchResult?.length === 0 ? <MainContent /> : <SearchResult />}</>
          )}
          <div ref={bottomLineRef}></div>
        </div>
      )}
    </>
  );
};



export default Main;