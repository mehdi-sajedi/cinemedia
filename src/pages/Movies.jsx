import { useContext } from 'react';
import { AppContext } from '../context/app-context';
import MoviesGrid from '../components/Movies/MoviesGrid';
import MoviesPagination from '../components/Movies/MoviesPagination';
import FilterMenu from '../components/Movies/FilterMenu/FilterMenu';
import FilterBtn from '../components/Home/FilterBtn';
import { movieGenres } from '../components/Utilities/helpers';

const Movies = () => {
  const { appState } = useContext(AppContext);

  const movieFilters = {
    runtime: `&with_runtime.gte=${
      appState.filters.movies.runtime?.value[0] || 0
    }&with_runtime.lte=${appState.filters.movies.runtime?.value[1] || 999}`,

    year: `&primary_release_date.gte=${
      appState.filters.movies.year?.valueFormatted[0] || 0
    }&primary_release_date.lte=${
      appState.filters.movies.year?.valueFormatted[1] || 9999
    }`,

    rating: `&vote_average.gte=${
      appState.filters.movies.rating?.valueFormatted[0] || 0
    }&vote_average.lte=${
      appState.filters.movies.rating?.valueFormatted[1] || 10
    }`,

    genre: `&with_genres=${appState.filters.movies.genres?.join('|') || ''}`,

    watchProviders: `&with_watch_providers=${
      appState.filters.movies.watchProviders?.join('|') || ''
    }&watch_region=US`,
  };

  const movies = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${appState.pagination.currentMoviesPage}&language=en-US&sort_by=popularity.desc${movieFilters.runtime}${movieFilters.year}${movieFilters.rating}${movieFilters.genre}${movieFilters.watchProviders}`;

  return (
    <>
      <FilterBtn />
      <MoviesGrid url={movies} route="movies" />
      <MoviesPagination />
      <FilterMenu genres={movieGenres} />
    </>
  );
};

export default Movies;
