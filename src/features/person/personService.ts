import axios from 'axios';
import { PersonCredits } from './personTypes';

const getPeopleService = async (page: number) => {
  const PEOPLE_API_URL = `https://api.themoviedb.org/3/person/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`;

  const res = await axios.get(PEOPLE_API_URL);
  let { results, ...rest } = res.data;

  results = results.filter(
    (m: any) =>
      m.profile_path &&
      m.known_for.length >= 3 &&
      m.known_for.some((media: any) => media.vote_count >= 100)
  );

  return { results, ...rest };
};

const getPersonService = async (personId: number) => {
  const PERSON_API_URL = `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=combined_credits,external_ids,images`;

  const res = await axios.get(PERSON_API_URL);

  let { combined_credits, known_for_department, ...rest } = res.data;

  let credits: PersonCredits[] = combined_credits.cast;

  // If person is primarily known for work outside of acting, pull results from the crew array
  if (known_for_department !== 'Acting') credits = combined_credits.crew;

  credits = credits
    .filter((media) => media.poster_path && !media.genre_ids.includes(10763))
    .filter((val, idx, arr) => arr.findIndex((t) => t.id === val.id) === idx)
    .sort((a, b) => b.vote_count - a.vote_count)
    .slice(0, 15);

  return {
    known_for_department,
    credits,
    ...rest,
  };
};

const personService = { getPersonService, getPeopleService };
export default personService;
