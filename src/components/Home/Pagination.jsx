import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useLocation } from 'react-router-dom';
import styles from './Pagination.module.scss';

const Pagination = () => {
  const { appState, dispatch } = useContext(AppContext);
  const { pathname } = useLocation();

  let currentPage;
  let totalMedia;

  if (pathname.includes('movies')) {
    currentPage = appState.pagination.currentMoviesPage;
    totalMedia = appState.pagination.totalMovies;
  } else {
    currentPage = appState.pagination.currentShowsPage;
    totalMedia = appState.pagination.totalShows;
  }

  const pageNumbers = [];
  let maxPages = Math.ceil(totalMedia / appState.pagination.mediaPerPage);
  maxPages = Math.min(maxPages, 20);

  for (let i = 1; i <= maxPages; i++) {
    pageNumbers.push(i);
  }

  pageNumbers.filter((num) => {
    return currentPage + 2 <= num;
  });

  const handlePaginate = (pageNum) => {
    if (pageNum < 1 || pageNum > maxPages) return;
    dispatch({
      type: 'SET-CURRENT-PAGE',
      payload: { pageNum: pageNum, route: pathname },
    });
  };

  return (
    <div className={styles.pagination}>
      <IoIosArrowBack
        onClick={() => handlePaginate(currentPage - 1)}
        className={`${styles.arrow} ${styles.arrowBack} ${
          currentPage === 1 ? 'inactive' : ''
        }`}
      />
      <div className={styles.mediaPages}>
        <ul>
          {currentPage >= 3 && (
            <>
              <li
                key={1}
                className={`${1 === currentPage ? styles.activePage : ''} `}
              >
                <button onClick={() => handlePaginate(1)}>1</button>
              </li>
              <span className={styles.dots}>...</span>
            </>
          )}

          {pageNumbers
            .filter((num) => currentPage + 2 >= num && currentPage - 1 <= num)
            .map((pageNum) => {
              return (
                <li
                  key={pageNum}
                  className={`${
                    pageNum === currentPage ? styles.activePage : ''
                  } `}
                >
                  <button onClick={() => handlePaginate(pageNum)}>
                    {pageNum}
                  </button>
                </li>
              );
            })}

          {currentPage + 2 < maxPages && (
            <>
              <span className={styles.dots}>...</span>
              <li
                key={maxPages}
                className={`${
                  maxPages === currentPage ? styles.activePage : ''
                } `}
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
        onClick={() => handlePaginate(currentPage + 1)}
        className={`${styles.arrow} ${styles.arrowForward} ${
          currentPage === maxPages ? 'inactive' : ''
        }`}
      />
    </div>
  );
};

export default Pagination;
