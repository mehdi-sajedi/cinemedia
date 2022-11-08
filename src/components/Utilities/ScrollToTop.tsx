import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { useAppSelector } from '../../hooks';

interface ScrollToTopProps {
  children: React.ReactNode;
}

const ScrollToTop = ({ children }: ScrollToTopProps) => {
  const location = useLocation();

  const { page: moviePage } = useAppSelector((state) => state.movie);
  const { page: showPage } = useAppSelector((state) => state.show);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, moviePage, showPage]);

  return <>{children}</>;
};

export default ScrollToTop;
