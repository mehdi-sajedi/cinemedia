import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import styles from './MoviesPagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { paginate } from '../../features/movies/movieSlice';

const MoviesPagination = () => {
  const dispatch = useDispatch();
  const { page, totalResults } = useSelector((state) => state.movie);

  const pageNumbers = [];
  let maxPages = Math.ceil(totalResults / 20);
  maxPages = Math.min(maxPages, 20);

  for (let i = 1; i <= maxPages; i++) {
    pageNumbers.push(i);
  }

  pageNumbers.filter((num) => {
    return page + 2 <= num;
  });

  const handlePaginate = (pageNum) => {
    if (pageNum < 1 || pageNum > maxPages) return;
    dispatch(paginate(pageNum));
  };

  return (
    <div className={styles.pagination}>
      <IoIosArrowBack
        onClick={() => handlePaginate(page - 1)}
        className={`${styles.arrow} ${styles.arrowBack} ${
          page === 1 ? 'inactive' : ''
        }`}
      />
      <div className={styles.mediaPages}>
        <ul>
          {page >= 3 && (
            <>
              <li key={1} className={`${1 === page ? styles.activePage : ''} `}>
                <button onClick={() => handlePaginate(1)}>1</button>
              </li>
              <span className={styles.dots}>...</span>
            </>
          )}

          {pageNumbers
            .filter((num) => page + 2 >= num && page - 1 <= num)
            .map((pageNum) => {
              return (
                <li
                  key={pageNum}
                  className={`${pageNum === page ? styles.activePage : ''} `}
                >
                  <button onClick={() => handlePaginate(pageNum)}>
                    {pageNum}
                  </button>
                </li>
              );
            })}

          {page + 2 < maxPages && (
            <>
              <span className={styles.dots}>...</span>
              <li
                key={maxPages}
                className={`${maxPages === page ? styles.activePage : ''} `}
              >
                <button onClick={() => handlePaginate(maxPages)}>
                  {maxPages}
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
      <IoIosArrowForward
        onClick={() => handlePaginate(page + 1)}
        className={`${styles.arrow} ${styles.arrowForward} ${
          page === maxPages ? 'inactive' : ''
        }`}
      />
    </div>
  );
};

export default MoviesPagination;
