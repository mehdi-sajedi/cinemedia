export const initialAppState = {
  results: {},
  currentMedia: {},
  person: {},
  search: {
    query: '',
    person: null,
    personFullName: '',
    id: null,
  },
  pagination: {
    currentMoviesPage: 1,
    currentShowsPage: 1,
    mediaPerPage: 20,
    totalMovies: 200,
    totalShows: 200,
  },
  currentSearchText: '',
  navMenuOpen: false,
  filterMenuOpen: false,
  filters: {
    movies: {},
    shows: {},
  },
};
