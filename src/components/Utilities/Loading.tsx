import { ClipLoader } from 'react-spinners';

const override = {
  display: 'block',
  margin: '5rem auto',
};

const Loading = () => {
  return <ClipLoader cssOverride={override} color="#17b28e" size={50} />;
};

export default Loading;
