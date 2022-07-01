import { useContext } from 'react';
import { AppContext } from '../context/app-context';
import Showcase from '../components/MediaDetails/Showcase';
import Details from '../components/MediaDetails/Details';
import Recommendations from '../components/MediaDetails/Recommendations';

const SingleMovie = () => {
  const { appState } = useContext(AppContext);

  return (
    <>
      <Showcase />
      <Details />
      {appState.currentMedia.recommendations?.length > 0 && <Recommendations />}
    </>
  );
};

export default SingleMovie;
