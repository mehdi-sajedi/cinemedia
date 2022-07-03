import axios from 'axios';

const getShowsService = async (page) => {
  const SHOWS_API_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`;

  const res = await axios.get(SHOWS_API_URL);
  return res.data;
};

const getSingleShowService = async (id) => {
  const SINGLE_SHOW_API_URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=recommendations,credits,external_ids,images,videos,reviews`;

  const res = await axios.get(SINGLE_SHOW_API_URL);
  return res.data;
};

const showService = { getShowsService, getSingleShowService };
export default showService;
