export interface MovieState {
  results: BasicMovie[];
  total_pages: number;
  page: number;
  movie?: SingleMovie;
  filterData: MovieFilterData;
  sort: string;
  filterMenuOpen: boolean;
  isLoading: boolean;
  isError: boolean;
  castScroll: number;
  prevMovieId: number;
}

export interface MovieFilterData {
  year: number[];
  runtime: number[];
  rating: number[];
  services: number[];
  genres: {
    value: number;
    label: string;
  }[];
}

export interface BasicMovie {
  id: number;
  title: string;
  release_date: string;
  overview: string;
  popularity: number;
  backdrop_path: string;
  poster_path: string;
  adult: boolean;
  vote_average: number;
  vote_count: number;
}

export interface SingleMovie extends BasicMovie {
  runtime: number;
  tagline: string;
  homepage: string;
  status: string;
  budget: number;
  revenue: number;
  external_ids: {
    facebook_id: string;
    instagram_id: string;
    twitter_id: string;
  };
  credits: {
    cast: {
      id: number;
      name: string;
      credit_id: string;
      profile_path: string;
      popularity: number;
      character: string;
    }[];
    crew: {
      id: number;
      name: string;
      credit_id: string;
      profile_path: string;
      job: string;
    }[];
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
      title: string;
      backdrop_path: string;
      popularity: number;
    }[];
  };
}
