import { useContext } from 'react';
import { AppContext } from '../context/app-context';
import ShowsGrid from '../components/Shows/ShowsGrid';
import ShowsPagination from '../components/Shows/ShowsPagination';

const Shows = () => {
  const { appState } = useContext(AppContext);

  const showFilters = {
    runtime: `&with_runtime.gte=${
      appState.filters.shows.runtime?.value[0] || 0
    }&with_runtime.lte=${appState.filters.shows.runtime?.value[1] || 999}`,

    year: `&first_air_date.gte=${
      appState.filters.shows.year?.valueFormatted[0] || 0
    }&first_air_date.lte=${
      appState.filters.shows.year?.valueFormatted[1] || 9999
    }`,

    rating: `&vote_average.gte=${
      appState.filters.shows.rating?.valueFormatted[0] || 0
    }&vote_average.lte=${
      appState.filters.shows.rating?.valueFormatted[1] || 10
    }`,

    genre: `&with_genres=${appState.filters.shows.genres?.join('|') || ''}`,

    watchProviders: `&with_watch_providers=${
      appState.filters.shows.watchProviders?.join('|') || ''
    }&watch_region=US`,
  };

  const shows = `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&page=${appState.pagination.currentShowsPage}&language=en-US&sort_by=popularity.desc${showFilters.runtime}${showFilters.year}${showFilters.rating}${showFilters.genre}${showFilters.watchProviders}`;

  return (
    <>
      {/* <FilterBtn /> */}
      <ShowsGrid url={shows} route="shows" />
      <ShowsPagination />
      {/* <FilterMenu genres={showGenres} /> */}
    </>
  );
};

export default Shows;
