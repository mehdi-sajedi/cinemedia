import styles from './CreditsItem.module.scss';
import { Link } from 'react-router-dom';
import { imageBaseFace } from '../../data/imagePaths';
import { useAppSelector } from '../../hooks';
import { CastCredit, CrewCredit } from '../../features/shows/showTypes';

interface CreditsItemProps {
  id: number;
  profile_path: string;
  name: string;
  total_episode_count: number;
  credits: CastCredit['roles'] | CrewCredit['jobs'];
}

const CreditsItem = ({
  id,
  profile_path,
  name,
  total_episode_count,
  credits,
}: CreditsItemProps) => {
  const { hideEpisodes } = useAppSelector((state) => state.show);

  return (
    <li className={styles.person}>
      <Link to={`/person/${id}`}>
        <img loading="lazy" src={`${imageBaseFace}${profile_path}`} alt="" />
      </Link>
      <div className={styles.personInfo}>
        <Link to={`/person/${id}`}>
          <h3>{name}</h3>
        </Link>
        <p>
          {'character' in credits[0] ? credits[0].character : credits[0].job}{' '}
          <span className={hideEpisodes ? styles.hide : ''}>
            ({total_episode_count} episodes)
          </span>
        </p>
      </div>
    </li>
  );
};

export default CreditsItem;
