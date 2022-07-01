import { useContext } from 'react';
import { AppContext } from '../context/app-context';
import Showcase from '../components/Media/Showcase';
import Details from '../components/Media/Details';
import Recommendations from '../components/Media/Recommendations';

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
