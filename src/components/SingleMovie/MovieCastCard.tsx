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
  profile_path: image,
  character,
  id,
}: MovieCastCardProps) => {
  const sizes = ['w92', 'w342'];

  const imagePaths = [
    `${imageBase}${sizes[0]}${image} ${sizes[0].slice(1) + 'w'}`,
    `${imageBase}${sizes[1]}${image} ${sizes[1].slice(1) + 'w'}`,
  ];

  return (
    <li className={styles.card}>
      <Link to={`/person/${id}`}>
        <img srcSet={imagePaths.join(`, `)} alt="" />
      </Link>
      <div className={styles.text}>
        <h5 className={styles.actor}>{name}</h5>
        <p>{character}</p>
      </div>
    </li>
  );
};

export default MovieCastCard;
