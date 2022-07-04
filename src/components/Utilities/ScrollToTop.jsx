import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';

const ScrollToTop = ({ children }) => {
  const location = useLocation();

  const { page: moviePage } = useSelector((state) => state.movie);
  const { page: showPage } = useSelector((state) => state.show);

  useEffect(() => {
    console.log('RAN');
    window.scrollTo(0, 0);
  }, [location, moviePage, showPage]);

  return <>{children}</>;
};

export default ScrollToTop;
