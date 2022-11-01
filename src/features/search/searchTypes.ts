export interface SearchState {
  results: (Show | Movie)[];
  text: string;
  name: string;
  id: number | null;
  isLoading: boolean;
  isError: boolean;
}

export interface BaseMedia {
  id: number;
  media_type: string;
  credit_id: string;
  vote_count: number;
  vote_average: number;
  poster_path: string;
  genre_ids: number[];
}

export interface Show extends BaseMedia {
  name: string;
  first_air_date: string;
}

export interface Movie extends BaseMedia {
  title: string;
  release_date: string;
}

export interface Person {
  id: number;
  media_type: string;
  name: string;
}

export type APIResult = Show | Movie | Person;

export function isMovie(media: Movie | Show): media is Movie {
  return (media as Movie).media_type === 'movie';
}

export function isPerson(media: Movie | Show | Person): media is Person {
  return (media as Person).media_type === 'person';
}
