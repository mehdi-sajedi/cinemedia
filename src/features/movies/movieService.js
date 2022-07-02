import axios from 'axios';

const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc`;

const getMoviesService = async (page) => {
  const res = await axios.get(API_URL + `&page=${page}`);
  return res.data;
};

const getSingleMovieService = async (id) => {
  const SINGLE_MOVIE_API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=recommendations,credits,external_ids,images,videos,reviews`;

  const res = await axios.get(SINGLE_MOVIE_API_URL);
  return res.data;
};

const movieService = { getMoviesService, getSingleMovieService };
export default movieService;
