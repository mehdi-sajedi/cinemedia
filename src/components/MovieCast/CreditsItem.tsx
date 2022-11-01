import styles from './CreditsItem.module.scss';
import { Link } from 'react-router-dom';
import { imageBaseFace } from '../../data/imagePaths';

interface CreditsItemProps {
  id: number;
  profile_path: string;
  name: string;
  creditType: string;
  character?: string;
  job?: string;
}

const CreditsItem = ({
  id,
  profile_path,
  name,
  creditType,
  character,
  job,
}: CreditsItemProps) => {
  return (
    <li className={styles.person}>
      <Link to={`/person/${id}`}>
        <img loading="lazy" src={`${imageBaseFace}${profile_path}`} alt="" />
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
