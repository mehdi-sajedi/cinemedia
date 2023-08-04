import { Link } from 'react-router-dom';
import styles from './PeopleCard.module.scss';
import { imageBase } from '../../data/imagePaths';

interface PeopleCardProps {
  profile_path: string;
  name: string;
  id: number;
  known_for: {
    title?: string;
    name?: string;
    id: number;
  }[];
}

const PeopleCard = ({ profile_path, name, id, known_for }: PeopleCardProps) => {
  return (
    <div className={styles.card}>
      <Link to={`/person/${id}`} className={styles.imageWrapper}>
        <img src={`${imageBase}w500${profile_path}`} loading="lazy" alt="" />
      </Link>
      <div className={styles.details}>
        <h3 className={styles.name}>{name}</h3>
        <ul>
          {known_for.map((m) => (
            <li key={`${name}${m.id}`}>{m.title || m.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PeopleCard;
