import FilterBtn from '../components/Home/FilterBtn';
import Grid from '../components/Home/Grid';
import Pagination from '../components/Home/Pagination';
import FilterMenu from '../components/Home/FilterMenu';
import { movieGenres } from '../components/Utilities/helpers';

const Movies = ({ movies }) => {
  return (
    <>
      <FilterBtn />
      <Grid url={movies} route="movies" />
      <Pagination />
      <FilterMenu genres={movieGenres} />
    </>
  );
};

export default Movies;
