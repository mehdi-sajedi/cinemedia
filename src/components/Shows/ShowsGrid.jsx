import { useEffect, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getShows } from '../../features/shows/showSlice';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import ShowsCard from './ShowsCard';
import styles from './ShowsGrid.module.scss';

const ShowsGrid = () => {
  const { results, page } = useSelector((state) => state.show);
  const dispatch = useDispatch();
  useDocumentTitle('Popular Shows');

  useEffect(() => {
    dispatch(getShows(page));
  }, [dispatch, page]);

  return (
    <section className={styles.grid}>
      {results.map((entry) => {
        return (
          entry.poster_path && (
            <ShowsCard {...entry} key={`${entry.id}${entry.credit_id}`} />
          )
        );
      })}
    </section>
  );
};

export default memo(ShowsGrid);
