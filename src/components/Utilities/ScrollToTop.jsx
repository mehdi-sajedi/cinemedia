import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    // document.title = location.pathname;
  }, [location]);

  return <>{children}</>;
};

export default ScrollToTop;
