import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import styles from './ShowsPagination.module.scss';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { paginate } from '../../features/shows/showSlice';

const ShowsPagination = () => {
  const dispatch = useAppDispatch();
  const { page, total_pages } = useAppSelector((state) => state.show);

  const pageNumbers: number[] = [];
  const maxPages = Math.min(total_pages, 20);

  for (let i = 1; i <= maxPages; i++) {
    pageNumbers.push(i);
  }

  const handlePaginate = (pageNum: number) => {
    if (pageNum < 1 || pageNum > maxPages) return;
    dispatch(paginate(pageNum));
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePaginate(page - 1)}
        className={`${styles.arrow} ${page === 1 ? styles.disabled : ''}`}
        disabled={page === 1}
        aria-label='Previous page'
      >
        <IoIosArrowBack />
      </button>
      <div className={styles.mediaPages}>
        <ul>
          {pageNumbers
            .filter(
              (n) =>
                n === 1 || n === maxPages || (page + 2 >= n && page - 1 <= n)
            )
            .map((n) => {
              return (
                <li key={n} className={n === page ? styles.activePage : ''}>
                  <button
                    onClick={() => handlePaginate(n)}
                    aria-label={`Page ${n}`}
                    aria-current={n === page ? 'page' : undefined}
                  >
                    {n}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      <button
        onClick={() => handlePaginate(page + 1)}
        className={`${styles.arrow} ${
          page === maxPages ? styles.disabled : ''
        }`}
        disabled={page === maxPages}
        aria-label='Next page'
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default ShowsPagination;
