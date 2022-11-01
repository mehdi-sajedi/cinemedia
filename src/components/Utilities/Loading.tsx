import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '5rem auto',
};

const Loading = () => {
  return <ClipLoader cssOverride={override} color={'#aaa'} size={50} />;
};

export default Loading;
