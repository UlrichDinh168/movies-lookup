import { createSlice } from '@reduxjs/toolkit'
import { AppThunk, AppDispatch, useAppDispatch } from "../store.js";
import { MOVIE_API_URL, SEARCH_API_URL, MOVIE_DETAILS_URL, MOVIE_CREDITS_URL, MOVIE_IMAGES_URL, MOVIE_VIDEOS_URL, MOVIE_REVIEWS_URL } from '../services/movies.service.js';

export type MoviesType = {
  list: string[],
  page: number,
  totalPages: number,
  movieType: string,
  searchQuery: string,
  searchResult: string[],
  movie: string[]
};

const initialState = {
  list: [],
  page: 1,
  totalPages: 0,
  movieType: 'now_playing',
  searchQuery: '',
  searchResult: [],
  movie: []
} as MoviesType

export const MoviesSlice = createSlice({
  name: 'MoviesSlice',
  initialState,
  reducers: {
    _movieList: (state, action) => {
      return {
        ...state,
        list: action.payload
      }
    },
    _responsePage: (state, action) => {
      return {
        ...state,
        page: action.payload.page,
        totalPages: action.payload.totalPages
      }
    },
    _loadMoreResults: (state, action) => {
      return {
        ...state,
        list: [...state.list, ...action.payload.list],
        page: action.payload.page,
        totalPages: action.payload.totalPages
      }
    },
    _movieType: (state, action) => {
      return {
        ...state,
        movieType: action.payload
      }
    },
    _searchResult: (state, action) => {
      return {
        ...state,
        searchResult: action.payload
      }
    },
    _searchQuery: (state, action) => {
      return {
        ...state,
        searchQuery: action.payload
      }
    },
    _movieDetails: (state, action) => {
      return {
        ...state,
        movie: action.payload
      }
    },
    _clearMovieDetails: (state) => {
      return {
        ...state,
        movie: []
      }
    },
  }
});

export default MoviesSlice.reducer

export const { _movieList, _responsePage, _loadMoreResults, _movieType, _movieDetails, _searchQuery, _searchResult, _clearMovieDetails } = MoviesSlice.actions

// const dispatchMethod = <T>(type: string, payload: T, dispatch: AppDispatch): void => {
//   dispatch({ type, payload });
// };

const getMoviesRequest = async (type: string, pageNumber: number) => {
  const movies = await MOVIE_API_URL(type, pageNumber);
  const { results, page, total_pages } = movies.data;
  const payload = {
    page,
    totalPages: total_pages
  };
  return { results, payload };
};

export const getMovies = (type: string, pageNumber: number) => async (dispatch: AppDispatch): Promise<void> => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    // const { results, payload } = response;
    dispatch(_movieList);
    // dispatch(RESPONSE_PAGE, payload);
  } catch (error) {
    if (error.response) {
      const payload = {
        message: error.response.data.message || error.response.data.status_message,
        statusCode: error.response.status
      };
      // dispatchMethod(SET_ERROR, payload, dispatch);
    }
  }
};

export const loadMoreMovies = (type: string, pageNumber) => async (dispatch: AppDispatch) => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    dispatchMethod(LOAD_MORE_RESULTS, { list: results, page: payload.page, totalPages: payload.totalPages }, dispatch);
  } catch (error) {
    if (error.response) {
      const payload = {
        message: error.response.data.message || error.response.data.status_message,
        statusCode: error.response.status
      };
      dispatchMethod(SET_ERROR, payload, dispatch);
    }
  }
};

export const searchResult = (query) => async (dispatch: AppDispatch) => {
  try {
    if (query) {
      const movies = await SEARCH_API_URL(query);
      const { results } = movies.data;
      dispatchMethod(SEARCH_RESULT, results, dispatch);
    } else {
      dispatchMethod(SEARCH_RESULT, [], dispatch);
    }
  } catch (error) {
    if (error.response) {
      const payload = {
        message: error.response.data.message || error.response.data.status_message,
        statusCode: error.response.status
      };
      dispatchMethod(SET_ERROR, payload, dispatch);
    }
  }
};

export const movieDetails = (id) => async (dispatch: AppDispatch) => {
  try {
    const details = await MOVIE_DETAILS_URL(id);
    const credits = await MOVIE_CREDITS_URL(id);
    const images = await MOVIE_IMAGES_URL(id);
    const videos = await MOVIE_VIDEOS_URL(id);
    const reviews = await MOVIE_REVIEWS_URL(id);

    const resp = await Promise.all([details, credits, images, videos, reviews])
      .then((values) => Promise.all(values.map((value) => value.data)))
      .then((response) => response);
    dispatchMethod(MOVIE_DETAILS, resp, dispatch);
  } catch (error) {
    if (error.response) {
      dispatchMethod(SET_ERROR, error.response.data.message, dispatch);
    }
  }
};

export const clearMovieDetails = () => async (dispatch: AppDispatch) => {
  dispatchMethod(CLEAR_MOVIE_DETAILS, [], dispatch);
};

export const setResponsePageNumber = (page, totalPages) => async (dispatch) => {
  const payload = { page, totalPages };
  dispatchMethod(RESPONSE_PAGE, payload, dispatch);
};

export const setMovieType = (type) => async (dispatch) => {
  dispatchMethod(MOVIE_TYPE, type, dispatch);
};

export const searchQuery = (query) => async (dispatch) => {
  dispatchMethod(SEARCH_QUERY, query, dispatch);
};



