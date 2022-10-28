import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import styles from './ShowsPagination.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { paginate } from '../../features/shows/showSlice';

const ShowsPagination = () => {
  const dispatch = useAppDispatch();
  const { page, total_results } = useAppSelector((state) => state.show);

  const pageNumbers: number[] = [];
  let maxPages = Math.ceil(total_results / 20);
  maxPages = Math.min(maxPages, 20);

  for (let i = 1; i <= maxPages; i++) {
    pageNumbers.push(i);
  }

  pageNumbers.filter((num) => {
    return page + 2 <= num;
  });

  const handlePaginate = (pageNum: number) => {
    if (pageNum < 1 || pageNum > maxPages) return;
    dispatch(paginate(pageNum));
  };

  return (
    <div className={styles.pagination}>
      <button
        onClick={() => handlePaginate(page - 1)}
        className={`${styles.arrow} ${page === 1 ? 'inactive' : ''}`}
      >
        <IoIosArrowBack />
      </button>
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
      <button
        onClick={() => handlePaginate(page + 1)}
        className={`${styles.arrow} ${page === maxPages ? 'inactive' : ''}`}
      >
        <IoIosArrowForward />
      </button>
    </div>
  );
};

export default ShowsPagination;
