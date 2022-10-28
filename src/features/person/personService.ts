import axios from 'axios';

const getPersonService = async (personId: number) => {
  const PERSON_API_URL = `https://api.themoviedb.org/3/person/${personId}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=combined_credits,external_ids`;

  const res = await axios.get(PERSON_API_URL);

  let { birthday, deathday, combined_credits, known_for_department, ...rest } =
    res.data;

  let creditType = 'cast';
  if (known_for_department !== 'Acting') creditType = 'crew';

  combined_credits[creditType] = combined_credits[creditType]
    .filter(
      (media: any) =>
        !media.genre_ids.includes(10763) || !media.genre_ids.includes(10763)
    )
    .filter(
      (val: any, idx: number, arr: []) =>
        arr.findIndex((t: any) => t.id === val.id) === idx
    )
    .sort((a: any, b: any) => b.vote_count - a.vote_count)
    .slice(0, 10);

  return {
    birthday,
    deathday,
    combined_credits,
    known_for_department,
    ...rest,
  };
};

const personService = { getPersonService };
export default personService;
