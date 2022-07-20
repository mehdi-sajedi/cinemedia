import axios from 'axios';

const getShowsService = async (page, filterData, sort) => {
  const SHOWS_API_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sort}&page=${page}`;

  const { year, runtime, rating, genres, services } = filterData;

  let voteCount = 100;
  if (sort === 'first_air_date.desc') voteCount = 10;

  const params = [
    `&first_air_date.gte=${year[0]}-01-01`,
    `&first_air_date.lte=${year[1]}-12-31`,
    `&with_runtime.gte=${runtime[0]}`,
    `&with_runtime.lte=${runtime[1]}`,
    `&vote_average.gte=${rating[0] / 10}`,
    `&vote_average.lte=${rating[1] / 10}`,
    `&with_genres=${genres.join('|')}`,
    `&with_watch_providers=${services.join('|')}`,
    `&watch_region=US`,
    `&vote_count.gte=${voteCount}`,
  ];

  const res = await axios.get(SHOWS_API_URL + params.join(''));
  return res.data;
};

const getSingleShowService = async (id) => {
  const SINGLE_SHOW_API_URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=recommendations,credits,external_ids,images,videos`;

  const res = await axios.get(SINGLE_SHOW_API_URL);
  return res.data;
};

const showService = { getShowsService, getSingleShowService };
export default showService;
