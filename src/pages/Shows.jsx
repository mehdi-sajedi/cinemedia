import FilterBtn from '../components/Home/FilterBtn';
import Grid from '../components/Home/Grid';
import Pagination from '../components/Home/Pagination';
import FilterMenu from '../components/Home/FilterMenu';
import { showGenres } from '../components/Utilities/helpers';

const Shows = ({ shows }) => {
  return (
    <>
      <FilterBtn />
      <Grid url={shows} route="shows" />
      <Pagination />
      <FilterMenu genres={showGenres} />
    </>
  );
};

export default Shows;
