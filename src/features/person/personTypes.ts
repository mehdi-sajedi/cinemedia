export interface PersonState {
  results: BasePerson[];
  total_pages: number;
  page: number;
  person?: SinglePerson;
  isLoading: boolean;
  isError: boolean;
}

export interface BasePerson {
  id: number;
  name: string;
  profile_path: string;
  known_for: {
    title?: string;
    name?: string;
    id: number;
    vote_count: number;
  }[];
}

export interface SinglePerson {
  name: string;
  known_for_department: string;
  profile_path: string;
  birthday: string;
  deathday: string;
  place_of_birth: string;
  biography: string;
  credits: PersonCredits[];
  external_ids: {
    instagram_id: string;
    facebook_id: string;
    twitter_id: string;
  };
  images: {
    profiles: {
      file_path: string;
    }[];
  };
}

export interface PersonCredits {
  id: number;
  media_type: string;
  poster_path: string;
  credit_id: string;
  genre_ids: number[];
  vote_count: number;
  name?: string;
  title?: string;
}
