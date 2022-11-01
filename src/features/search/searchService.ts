import axios from 'axios';
import { SearchState, APIResult, Person, isPerson } from './searchTypes';

const getSearchResultsService = async (text: string) => {
  const API_URL_MOVIES_SHOWS = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${text}`;

  const { data } = await axios.get(API_URL_MOVIES_SHOWS);
  let results: APIResult[] = data.results;

  // Check if API returns a person of exact match to user search
  const person = results.find(
    (entry): entry is Person =>
      isPerson(entry) && entry.name.toLowerCase() === text.toLowerCase()
  );

  const firstEntry = results[0];

  if (person) {
    return getPersonMedia(person);
  } else if (isPerson(firstEntry)) {
    return getPersonMedia(firstEntry);
  } else {
    // User is not trying to search for a person, so return the default API response minus any person objects and only ones that have a poster image
    results = results.filter((entry) => {
      return !isPerson(entry) && entry.poster_path;
    });
    return {
      results: results as SearchState['results'],
      text,
      name: '',
      id: null,
    };
  }
};

const getPersonMedia = async (person: Person) => {
  const API_URL_PERSON = `https://api.themoviedb.org/3/person/${person.id}/combined_credits?api_key=${process.env.REACT_APP_API_KEY}`;

  const res = await axios.get(API_URL_PERSON);
  let { cast, crew } = res.data;

  let credits: SearchState['results'] = cast;
  // If the person has more entries in the crew array, pull the search results from there
  if (crew.length > cast.length) credits = crew;

  credits = credits
    // Remove entries that don't have a poster image or are of genre type `news`
    .filter((m) => m.poster_path && !m.genre_ids.includes(10763))
    // Remove duplicate entries due to actor having multiple credits for a single show/movie
    .filter((val, idx, arr) => arr.findIndex((t) => t.id === val.id) === idx)
    .sort((a, b) => b.vote_count - a.vote_count);

  return {
    results: credits,
    text: '',
    name: person.name,
    id: person.id,
  };
};

const searchService = { getSearchResultsService };
export default searchService;
