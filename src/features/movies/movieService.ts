import axios from 'axios';
import { MovieFilterData, MovieSort } from './movieTypes';

const getMoviesService = async (
  page: number,
  filterData: MovieFilterData,
  sort: MovieSort
) => {
  const MOVIES_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&with_original_language=en&sort_by=${sort}&page=${page}`;

  const { year, runtime, rating, genres, services } = filterData;

  const genreValues = genres.map((opt) => opt.value);

  let minimumVotes = 100;
  if (sort === 'vote_average.desc') minimumVotes = 500;
  else if (sort === 'primary_release_date.desc') minimumVotes = 5;

  const params = [
    `&primary_release_date.gte=${year[0]}-01-01`,
    `&primary_release_date.lte=${year[1]}-12-31`,
    `&with_runtime.gte=${runtime[0]}`,
    `&with_runtime.lte=${runtime[1]}`,
    `&vote_average.gte=${rating[0] / 10}`,
    `&vote_average.lte=${rating[1] / 10}`,
    `&with_genres=${genreValues.join('|')}`,
    `&with_watch_providers=${services.join('|')}`,
    `&watch_region=US`,
    `&vote_count.gte=${minimumVotes}`,
  ];

  const res = await axios.get(MOVIES_API_URL + params.join(''));
  return res.data;
};

const getSingleMovieService = async (id: number) => {
  const SINGLE_MOVIE_API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=recommendations,credits,external_ids,images,videos`;

  const res = await axios.get(SINGLE_MOVIE_API_URL);
  return res.data;
};

const movieService = {
  getMoviesService,
  getSingleMovieService,
};
export default movieService;
