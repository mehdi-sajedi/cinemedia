import styles from './CreditsItem.module.scss';
import { Link } from 'react-router-dom';

const CreditsItem = ({
  id,
  profile_path,
  name,
  creditType,
  character,
  job,
}) => {
  return (
    <li className={styles.person}>
      <Link to={`/person/${id}`}>
        <img
          loading="lazy"
          src={`https://image.tmdb.org/t/p/w132_and_h132_face${profile_path}`}
          alt=""
        />
      </Link>
      <div className={styles.personInfo}>
        <Link to={`/person/${id}`}>
          <h3>{name}</h3>
        </Link>
        <p>{creditType === 'cast' ? character : job} </p>
      </div>
    </li>
  );
};

export default CreditsItem;
