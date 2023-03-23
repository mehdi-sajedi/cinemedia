import axios from 'axios';
import { Show, Movie, Person, isPerson, isShowOrMovie } from './searchTypes';

const getSearchResultsService = async (text: string) => {
  const API_URL_MOVIES_SHOWS = `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&query=${text}`;

  const { data } = await axios.get(API_URL_MOVIES_SHOWS);

  let results: (Show | Movie | Person)[] = data.results;

  const onlyOnePersonInResults =
    results.filter((r) => isPerson(r)).length === 1;
  if (onlyOnePersonInResults) {
    const person = results.find((r) => isPerson(r)) as Person;
    return getPersonMedia(person);
  }

  results.sort((b, a) => a.popularity - b.popularity);

  const firstEntry = results[0];

  if (isPerson(firstEntry)) {
    return getPersonMedia(firstEntry);
  } else {
    // User is not trying to search for a person, so return the default API response minus any person objects and only ones that have a poster image
    const filteredResults = results.filter((entry): entry is Show | Movie => {
      return isShowOrMovie(entry) && !!entry.poster_path;
    });

    return {
      results: filteredResults,
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

  let credits: (Show | Movie)[] = cast;

  // If the person has more entries in the crew array, pull the search results from there
  if (crew.length > cast.length) credits = crew;

  const filteredCredits = credits
    // Remove entries that don't have a poster image or are of genre type `news`
    .filter(
      (m) =>
        m.poster_path &&
        !m.genre_ids.includes(10763) &&
        !m.genre_ids.includes(10767)
    )
    // Remove duplicate entries due to actor having multiple credits for a single show/movie
    .filter((val, idx, arr) => arr.findIndex((t) => t.id === val.id) === idx)
    .sort((a, b) => b.vote_count - a.vote_count);

  return {
    results: filteredCredits,
    text: '',
    name: person.name,
    id: person.id,
  };
};

const searchService = { getSearchResultsService };
export default searchService;
