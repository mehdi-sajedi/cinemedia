import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShowsGrid from '../components/Shows/ShowsGrid';
import ShowsPagination from '../components/Shows/ShowsPagination';
import FilterMenu from '../components/Shows/FilterMenu/FilterMenu';
import FilterBtn from '../components/Shows/FilterMenu/FilterBtn';
import Loading from '../components/Utilities/Loading';
import Error from '../components/Utilities/Error';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { getShows } from '../features/shows/showSlice';
import styles from './Shows.module.scss';

const Shows = () => {
  const dispatch = useDispatch();
  const { page, isLoading, isError } = useSelector((state) => state.show);
  useDocumentTitle('Popular Shows');

  useEffect(() => {
    dispatch(getShows(page));
  }, [dispatch, page]);

  if (isError) return <Error />;

  return (
    <>
      <FilterBtn />
      <>
        <div className={styles.row}>
          <FilterMenu />
          {isLoading ? <Loading /> : <ShowsGrid />}
        </div>
        <ShowsPagination />
      </>
    </>
  );
};

export default Shows;
