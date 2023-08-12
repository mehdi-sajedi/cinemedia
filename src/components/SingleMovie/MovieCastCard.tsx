import { Link } from 'react-router-dom';
import styles from './MovieCastCard.module.scss';
import { imageBase } from '../../data/imagePaths';

interface MovieCastCardProps {
  name: string;
  profile_path: string;
  character: string;
  id: number;
}

const MovieCastCard = ({
  name,
  profile_path,
  character,
  id,
}: MovieCastCardProps) => {
  return (
    <li className={styles.card}>
      <Link to={`/person/${id}`}>
        <img src={`${imageBase}w342${profile_path}`} alt={name} />
      </Link>
      <div className={styles.text}>
        <h3 className={styles.actor}>{name}</h3>
        <p>{character}</p>
      </div>
    </li>
  );
};

export default MovieCastCard;
