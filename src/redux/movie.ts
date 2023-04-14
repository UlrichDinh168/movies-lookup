import { createSlice, } from '@reduxjs/toolkit'
import { MOVIE_API_URL, SEARCH_API_URL, MOVIE_DETAILS_URL, MOVIE_CREDITS_URL, MOVIE_IMAGES_URL, MOVIE_VIDEOS_URL, MOVIE_REVIEWS_URL } from '../services/movies.service.js';
import { setError } from './error.js';
import { store } from '../store.js'

export type MoviesType = {
  list: any,
  page: number,
  totalPages: number,
  movieType: string,
  searchQuery: string,
  searchResult: string[],
  movie: (string | number)[]
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

export const getMoviesRequest = async (type: string, pageNumber: number) => {
  const movies = await MOVIE_API_URL(type, pageNumber);
  const { results, page, total_pages } = movies.data;
  const payload = {
    page,
    totalPages: total_pages
  };
  return { results, payload }
}

const normalizeError = (error: any) => {
  if (error.response) {
    const payload = {
      message: error.response.data.message || error.response.data.status_message,
      statusCode: error.response.status
    };
    store.dispatch(setError(payload));
  }
}
export const getMovies = async (type: string, pageNumber: number): Promise<void> => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    store.dispatch(_movieList(results));
    store.dispatch(_responsePage(payload));
  } catch (error: any) {
    normalizeError(error)
  }
};

export const loadMoreMovies = async (type: string, pageNumber: number): Promise<void> => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    store.dispatch(_loadMoreResults({ list: results, page: payload.page, totalPages: payload.totalPages }))
  } catch (error: any) {
    if (error.response) {
      normalizeError(error);
    }
  }
};

export const searchResult = async (query: any) => {
  try {
    if (query) {
      const movies = await SEARCH_API_URL(query);
      const { results } = movies.data;
      store.dispatch(_searchResult(results));
    } else {
      store.dispatch(_searchResult([]));
    }
  } catch (error) {
    normalizeError(error)
  }
};

export const movieDetails = async (id: number | string) => {
  try {

    const details = await MOVIE_DETAILS_URL(id);
    const credits = await MOVIE_CREDITS_URL(id);
    const images = await MOVIE_IMAGES_URL(id);
    const videos = await MOVIE_VIDEOS_URL(id);
    const reviews = await MOVIE_REVIEWS_URL(id);

    const resp = await Promise.all([details, credits, images, videos, reviews])
      .then((values) => Promise.all(values.map((value) => value.data)))
      .then((response) => response);
    store.dispatch(_movieDetails(resp))
  } catch (error) {
    normalizeError(error)
  }
};

export const clearMovieDetails = async () => {
  store.dispatch(_clearMovieDetails())
};

export const setResponsePageNumber = async (page: number, totalPages: number) => {
  const payload = { page, totalPages };
  store.dispatch(_responsePage(payload))
};

export const setMovieType = async (type: string) => {
  store.dispatch(_movieType(type))
};

export const searchQuery = async (query: string) => {
  store.dispatch(_searchQuery(query))
};



