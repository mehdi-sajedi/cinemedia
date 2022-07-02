import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getSingleMovie } from '../features/movies/movieSlice';
import { useLocation } from 'react-router';
import Showcase from '../components/Media/Showcase';
import Details from '../components/Media/Details';
import Recommendations from '../components/Media/Recommendations';

const SingleMovie = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const mediaId = pathname.substring(pathname.lastIndexOf('/') + 1);

  useEffect(() => {
    dispatch(getSingleMovie(mediaId));
  }, [dispatch, mediaId]);

  return (
    <>
      <Showcase />
      <Details />
      <Recommendations />
    </>
  );
};

export default SingleMovie;
