import axios from 'axios';

const REQUEST_URL = 'https://api.themoviedb.org/3';
export const IMAGE_URL = 'https://image.tmdb.org/t/p/original';

const API_KEY = import.meta.env.VITE_API_SECRET;
const API_KEY_URL = `?api_key=${API_KEY}&language=en-US`;

export const MOVIE_API_URL = async (type: string, page: number) => {
  const response = await axios.get(
    `${REQUEST_URL}/movie/${type}${API_KEY_URL}&page=${page}`
  );
  return response;
};

export const SEARCH_API_URL = async (query: string) => {
  const response = await axios.get(
    `${REQUEST_URL}/search/movie${API_KEY_URL}&query=${query}`
  );
  return response;
};

export const MOVIE_DETAILS_URL = async (id: number | string) => {
  const response = await axios.get(
    `${REQUEST_URL}/movie/${id}${API_KEY_URL}`
  );
  return response;
};

export const MOVIE_CREDITS_URL = async (id: number | string) => {
  const response = await axios.get(
    `${REQUEST_URL}/movie/${id}/credits${API_KEY_URL}`
  );
  return response;
};

export const MOVIE_IMAGES_URL = async (id: number | string) => {
  const response = await axios.get(
    `${REQUEST_URL}/movie/${id}/images${API_KEY_URL}&include_image_language=en`
  );
  return response;
};

export const MOVIE_VIDEOS_URL = async (id: number | string) => {
  const response = await axios.get(
    `${REQUEST_URL}/movie/${id}/videos${API_KEY_URL}`
  );
  return response;
};

export const MOVIE_REVIEWS_URL = async (
  id: number | string,
  page = 1
) => {
  const response = await axios.get(
    `${REQUEST_URL}/movie/${id}/reviews${API_KEY_URL}&page=${page}`
  );
  return response;
};
