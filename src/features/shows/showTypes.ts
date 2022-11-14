export interface ShowState {
  results: BasicShow[];
  total_pages: number;
  page: number;
  show?: SingleShow;
  filterData: ShowFilterData;
  sort: ShowSort;
  filterMenuOpen: boolean;
  isLoading: boolean;
  isError: boolean;
  castScroll: number;
  prevShowId: number;
  hideEpisodes: boolean;
}

export type ShowSort =
  | 'popularity.desc'
  | 'vote_average.desc'
  | 'first_air_date.desc';

export interface ShowFilterData {
  year: number[];
  rating: number[];
  services: number[];
  status: {
    value: 0 | 3 | 4;
    label: string;
  }[];
  type: {
    value: 0 | 2 | 3 | 4 | 5;
    label: string;
  }[];
  genres: {
    value: number;
    label: string;
  }[];
}

export interface BasicShow {
  id: number;
  name: string;
  first_air_date: string;
  overview: string;
  popularity: number;
  backdrop_path: string;
  poster_path: string;
  adult: boolean;
  vote_average: number;
  vote_count: number;
}

export interface SingleShow extends BasicShow {
  tagline: string;
  homepage: string;
  status: string;
  episode_run_time: number[];
  number_of_seasons: number;
  number_of_episodes: number;
  last_air_date: string;
  networks: {
    logo_path: string;
  }[];
  external_ids: {
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
  };
  aggregate_credits: {
    cast: CastCredit[];
    crew: CrewCredit[];
  };
  images: {
    backdrops: {
      width: number;
      file_path: string;
    }[];
  };
  genres: {
    id: number;
    name: string;
  }[];
  videos: {
    results: {
      type: string;
      site: string;
      key: string;
    }[];
  };
  recommendations: {
    results: {
      id: number;
      name: string;
      backdrop_path: string;
      popularity: number;
    }[];
  };
}

export interface BaseCredit {
  id: number;
  name: string;
  credit_id: string;
  profile_path: string;
  known_for_department: string;
  total_episode_count: number;
}

export interface CastCredit extends BaseCredit {
  popularity: number;
  character: string;
  roles: {
    character: string;
    credit_id: string;
  }[];
}

export interface CrewCredit extends BaseCredit {
  job: string;
  jobs: {
    job: string;
    credit_id: string;
  }[];
}

export function isCast(credit: CastCredit | CrewCredit): credit is CastCredit {
  return (credit as CastCredit).known_for_department === 'Acting';
}
