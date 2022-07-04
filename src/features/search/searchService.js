import axios from 'axios';

const getPersonMedia = async (person) => {
  const API_URL_PERSON = `https://api.themoviedb.org/3/person/${person.id}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}`;

  const res = await axios.get(API_URL_PERSON);
  let { cast: results } = res.data;

  results = results
    .filter((m) => !m.genre_ids.includes(10763) && m.poster_path)
    .sort((a, b) => b.vote_count - a.vote_count);

  return results;
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
    return data.results.filter(
      (entry) => entry.media_type !== 'person' && entry.poster_path
    );
  }
};

const searchService = { getSearchResultsService };
export default searchService;
