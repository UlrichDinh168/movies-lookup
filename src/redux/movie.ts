import { createSlice } from '@reduxjs/toolkit';
import {
  MOVIE_API_URL,
  SEARCH_API_URL,
  MOVIE_DETAILS_URL,
  MOVIE_CREDITS_URL,
  MOVIE_IMAGES_URL,
  MOVIE_VIDEOS_URL,
  MOVIE_REVIEWS_URL
} from '../services/movies.service.js';
import { setError } from './error.js';
import { store } from '../store.js';
import { MovieList, Movie, CastItemType, CrewItemType, PosterItemType, VideoItemType, ReviewItemType, LogoItemType, BackdropItemType } from './types';

export type MovieData = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: {
    id: number;
    name: string;
  }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: {
    id: number;
    logo_path: string | null;
    name: string;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: {
    english_name: string;
    iso_639_1: string;
    name: string;
  }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  cast: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
  }[];
  crew: {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    credit_id: string;
    department: string;
    job: string;
  }[];
  backdrops: {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
  logos: {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
  posters: {
    aspect_ratio: number;
    height: number;
    iso_639_1: string;
    file_path: string;
    vote_average: number;
    vote_count: number;
    width: number;
  }[];
  results: {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }[];
  page: number;
  total_pages: number;
  total_results: number;
  author: string;
  author_details: {
    name: string;
    username: string;
    avatar_path: string | null;
    rating: number | null;
  };
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}

export type MoviesType = {
  list: MovieList[];
  page: number;
  totalPages: number;
  movieType: string;
  searchQuery: string;
  searchResult: string[];
  movie: MovieData[];
  loading: boolean;
};

type MovieArray = Array<
  Movie |
  CastItemType |
  CrewItemType |
  VideoItemType |
  ReviewItemType |
  LogoItemType |
  PosterItemType |
  BackdropItemType
>;


const initialState = {
  list: [],
  page: 1,
  totalPages: 0,
  movieType: 'now_playing',
  searchQuery: '',
  searchResult: [],
  movie: [],
  loading: false
} as MoviesType;

export const MoviesSlice = createSlice({
  name: 'MoviesSlice',
  initialState,
  reducers: {
    _movieList: (state, action) => {
      return {
        ...state,
        list: action.payload
      };
    },
    _responsePage: (state, action) => {
      return {
        ...state,
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    },
    _loadMoreResults: (state, action) => {
      return {
        ...state,
        list: [...state.list, ...action.payload.list],
        page: action.payload.page,
        totalPages: action.payload.totalPages
      };
    },
    _movieType: (state, action) => {
      return {
        ...state,
        movieType: action.payload
      };
    },
    _searchResult: (state, action) => {
      return {
        ...state,
        searchResult: action.payload
      };
    },
    _searchQuery: (state, action) => {
      return {
        ...state,
        searchQuery: action.payload
      };
    },
    _movieDetails: (state, action) => {
      return {
        ...state,
        movie: action.payload
      };
    },
    _clearMovieDetails: (state) => {
      return {
        ...state,
        movie: []
      };
    },
    _setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload
      };
    }
  }
});

export default MoviesSlice.reducer;

export const {
  _movieList,
  _responsePage,
  _loadMoreResults,
  _movieType,
  _movieDetails,
  _searchQuery,
  _searchResult,
  _clearMovieDetails,
  _setLoading
} = MoviesSlice.actions;

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
  return { results, payload };
};

const normalizeError = (error: unknown) => {
  if (error.response) {
    const payload = {
      message: error.response.data.message || error.response.data.status_message,
      statusCode: error.response.status
    };
    store.dispatch(setError(payload));
  }
};


export const getMovies = async (type: string, pageNumber: number): Promise<void> => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    console.log(response, 'response');

    const { results, payload } = response;
    store.dispatch(_movieList(results));
    store.dispatch(_responsePage(payload));
  } catch (error: unknown) {
    normalizeError(error);
  }
};


export const loadMoreMovies = async (type: string, pageNumber: number): Promise<void> => {
  try {
    const response = await getMoviesRequest(type, pageNumber);
    const { results, payload } = response;
    store.dispatch(_loadMoreResults({ list: results, page: payload.page, totalPages: payload.totalPages }));
  } catch (error: unknown) {
    // if (error.response) {
    //   normalizeError(error);
    // }
    if ((error as { response: unknown }).response) {
      normalizeError(error as { response: unknown });
      // Handle the error
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
    normalizeError(error);
  }
};

export const movieDetails = async (id: number) => {
  try {
    const details = await MOVIE_DETAILS_URL(id);
    const credits = await MOVIE_CREDITS_URL(id);
    const images = await MOVIE_IMAGES_URL(id);
    const videos = await MOVIE_VIDEOS_URL(id);
    const reviews = await MOVIE_REVIEWS_URL(id);

    const resp = await Promise.all([details, credits, images, videos, reviews])
      .then((values) => Promise.all(values.map((value) => value.data)))
      .then((response) => response);

    store.dispatch(_movieDetails(resp));
  } catch (error) {
    normalizeError(error);
  }
};

export const clearMovieDetails = async () => {
  store.dispatch(_clearMovieDetails());
};

export const setResponsePageNumber = async (page: number, totalPages: number) => {
  const payload = { page, totalPages };
  store.dispatch(_responsePage(payload));
};

export const setMovieType = async (type: string) => {
  store.dispatch(_movieType(type));
};

export const searchQuery = async (query: string) => {
  store.dispatch(_searchQuery(query));
};

export const setLoading = (isLoading: boolean) => {
  store.dispatch(_setLoading(isLoading));
};
