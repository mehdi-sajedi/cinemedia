import axios from 'axios';

const getPersonMedia = async (person) => {
  const API_URL_PERSON = `https://api.themoviedb.org/3/person/${person.id}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}`;

  const res = await axios.get(API_URL_PERSON);
  console.log(res.data);
  let { cast, crew } = res.data;

  let credits = cast;
  // If the person has more entries in the crew array, pull the search results from there
  if (crew.length > cast.length) credits = crew;

  credits = credits
    .filter((m) => !m.genre_ids.includes(10763) && m.poster_path)
    .filter((val, idx, arr) => arr.findIndex((t) => t.id === val.id) === idx)
    .sort((a, b) => b.vote_count - a.vote_count);

  return {
    results: credits,
    name: person.name,
    id: person.id,
    text: '',
  };
};

const getSearchResultsService = async (text) => {
  const API_URL_MOVIES_SHOWS = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${text}`;

  const { data } = await axios.get(API_URL_MOVIES_SHOWS);

  // Check if API returns a person of exact match to user search
  const person = data.results.find(
    (entry) =>
      entry.media_type === 'person' &&
      entry.name.toLowerCase() === text.toLowerCase()
  );

  const firstEntry = data.results[0];

  if (person || firstEntry.media_type === 'person') {
    // User is trying to search for a person, so return results based on the persons most popular work
    return getPersonMedia(person || firstEntry);
  } else {
    // User is not trying to search for a person, so return the default API response minus any person objects and only ones that have a poster image
    const results = data.results.filter(
      (entry) => entry.media_type !== 'person' && entry.poster_path
    );
    return {
      results,
      text,
      name: '',
      id: null,
    };
  }
};

const searchService = { getSearchResultsService };
export default searchService;
