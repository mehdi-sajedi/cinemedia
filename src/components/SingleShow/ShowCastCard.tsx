import { Link } from 'react-router-dom';
import styles from './ShowCastCard.module.scss';
import { imageBase } from '../../data/imagePaths';

interface ShowCastCardProps {
  name: string;
  profile_path: string;
  character: string;
  id: number;
  roles: {
    character: string;
  }[];
}

const ShowCastCard = ({ name, profile_path, id, roles }: ShowCastCardProps) => {
  return (
    <li className={styles.card}>
      <Link to={`/person/${id}`}>
        <img src={`${imageBase}w342${profile_path}`} alt='' />
      </Link>
      <div className={styles.text}>
        <h3 className={styles.actor}>{name}</h3>
        <p>{roles[0].character}</p>
      </div>
    </li>
  );
};

export default ShowCastCard;
