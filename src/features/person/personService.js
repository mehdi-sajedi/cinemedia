import axios from 'axios';

const getPersonService = async (personId) => {
  const PERSON_API_URL = `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=combined_credits,external_ids`;

  const res = await axios.get(PERSON_API_URL);

  let { birthday, deathday, combined_credits, ...rest } = res.data;

  // if (birthday) birthday = birthday.replace(/-/g, '/');
  // if (deathday) deathday = deathday.replace(/-/g, '/');

  combined_credits.cast = combined_credits.cast
    .filter(
      (media) =>
        !media.genre_ids.includes(10763) || !media.genre_ids.includes(10763)
    )
    .sort((a, b) => b.vote_count - a.vote_count);

  return {
    birthday,
    deathday,
    combined_credits,
    ...rest,
  };
};

const personService = { getPersonService };
export default personService;
