import axios from 'axios';
import { ShowFilterData } from './showTypes';

const getShowsService = async (
  page: number,
  filterData: ShowFilterData,
  sort: string
) => {
  const SHOWS_API_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=${sort}&page=${page}`;

  const { year, rating, genres, services, status, type } = filterData;

  const statusValues = status.map((opt) => opt.value);
  const typeValues = type.map((opt) => opt.value);
  const genreValues = genres.map((opt) => opt.value);

  let minimumVotes = 100;
  if (sort === 'first_air_date.desc') minimumVotes = 10;

  const params = [
    `&first_air_date.gte=${year[0]}-01-01`,
    `&first_air_date.lte=${year[1]}-12-31`,
    `&vote_average.gte=${rating[0] / 10}`,
    `&vote_average.lte=${rating[1] / 10}`,
    `&with_genres=${genreValues.join('|')}`,
    `&with_watch_providers=${services.join('|')}`,
    `&watch_region=US`,
    `&vote_count.gte=${minimumVotes}`,
    `&with_status=${statusValues.join('|')}`,
    `&with_type=${typeValues.join('|')}`,
  ];

  const res = await axios.get(SHOWS_API_URL + params.join(''));
  return res.data;
};

const getSingleShowService = async (id: number) => {
  const SINGLE_SHOW_API_URL = `https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=recommendations,external_ids,images,videos,aggregate_credits`;

  const res = await axios.get(SINGLE_SHOW_API_URL);
  return res.data;
};

const showService = { getShowsService, getSingleShowService };
export default showService;
