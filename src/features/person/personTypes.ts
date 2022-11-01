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

export interface PersonState {
  person?: {
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
  };
  isLoading: boolean;
  isError: boolean;
}
