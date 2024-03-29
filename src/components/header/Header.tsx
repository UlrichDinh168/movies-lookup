import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent
} from 'react';
// import PropTypes from 'prop-types';
import { useNavigate, useLocation, useMatch } from 'react-router-dom';
import logo from '/assets/cinema-logo.svg';
import {
  getMovies,
  setMovieType,
  setResponsePageNumber,
  searchQuery,
  searchResult,
  clearMovieDetails
} from '../../redux/movie';
import { pathURL } from '../../redux/route';
import { setError } from '../../redux/error';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

const HEADER_LIST = [
  {
    id: 1,
    iconClass: 'fas fa-film',
    name: 'Now Playing',
    type: 'now_playing'
  },
  {
    id: 2,
    iconClass: 'fas fa-fire',
    name: 'Popular',
    type: 'popular'
  },
  {
    id: 3,
    iconClass: 'fas fa-star',
    name: 'Top Rated',
    type: 'top_rated'
  },
  {
    id: 4,
    iconClass: 'fas fa-plus-square',
    name: 'Upcoming',
    type: 'upcoming'
  }
];

const Header = () => {
  const { url, routesArray, path } = useSelector(
    (state: RootState) => state.route
  );
  const { page, totalPages } = useSelector(
    (state: RootState) => state.movie
  );
  const { message, statusCode } = useSelector(
    (state: RootState) => state.error
  );

  const [type, setType] = useState('now_playing');
  const [search, setSearch] = useState('');
  const [disableSearch, setDisableSearch] = useState(false);
  const [hideHeader, setHideHeader] = useState(false);

  const [isToggle, setIsToggle] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const detailsRoute = useMatch('/:id/:name/details');

  const effectRan = useRef(false);

  // check users enter invalid paths
  useEffect(() => {
    if (routesArray.length) {
      if (!path && !url) {
        pathURL('/', '/');
        const error = new Error(
          `Page with pathname ${location.pathname} not found with status code 404.`
        );
        setError({
          message: `Page with pathname ${location.pathname} not found.`,
          statusCode: 404
        });
        throw error;
      }
    }
    // eslint-disable-next-line
  }, [path, url, routesArray, pathURL]);

  // check if there're any error while calling APIs
  useEffect(() => {
    if (message || statusCode) {
      pathURL('/', '/');
      const error = new Error(
        `${message} With status code ${statusCode} `
      );
      setError({
        message: `Page with pathname ${location.pathname} not found.`,
        statusCode: 404
      });
      throw error;
    }
    // eslint-disable-next-line
  }, [message, statusCode]);

  // Disable header when error appears
  useEffect(() => {
    if (effectRan.current === false) {
      if (location.pathname && !message && !statusCode) {
        getMovies(type, page);
        setResponsePageNumber(page, totalPages);

        if (detailsRoute || location.pathname === '/') {
          setHideHeader(true);
        }

        if (location.pathname !== '/' && location.key) {
          setDisableSearch(true);
        }
      }
    }

    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line
  }, [type, disableSearch, location]);

  const setMovieTypeUrl = (type: string) => {
    setDisableSearch(false);
    if (location.pathname !== '/') {
      clearMovieDetails();
      navigate('/');
      setType(type);
      setMovieType(type);
    } else {
      setType(type);
      setMovieType(type);
    }
  };

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    searchQuery(e.target.value);
    searchResult(e.target.value);
  };

  const navigateToMainPage = () => {
    setDisableSearch(false);
    clearMovieDetails();
    navigate('/');
  };

  const toggleMenu = () => {
    setIsToggle(!isToggle);
  };

  return (
    <>
      {hideHeader && (
        <div className="header-nav-wrapper">
          <div className="header-bar"></div>
          <div className="header-navbar">
            <div
              className="header-image"
              onClick={() => navigateToMainPage()}
            >
              <img src={logo} alt="" />
            </div>
            <div
              className={`${
                isToggle
                  ? 'header-menu-toggle header-nav-open is-active'
                  : 'header-menu-toggle'
              }`}
              id="header-mobile-menu"
              onClick={() => toggleMenu()}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
            <ul
              className={`${
                isToggle
                  ? 'header-nav header-mobile-nav'
                  : 'header-nav'
              }`}
            >
              {HEADER_LIST.map((data) => (
                <li
                  key={data.id}
                  className={
                    data.type === type
                      ? 'header-nav-item active-item'
                      : 'header-nav-item'
                  }
                  onClick={() => setMovieTypeUrl(data.type)}
                >
                  <span className="header-list-name">
                    <i className={data.iconClass}></i>
                  </span>
                  &nbsp;
                  <span className="header-list-name">
                    {data.name}
                  </span>
                </li>
              ))}
              <input
                className={`search-input ${
                  disableSearch ? 'disabled' : ''
                }`}
                type="text"
                placeholder="Search for a movie"
                value={search}
                onChange={onSearchChange}
              />
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
