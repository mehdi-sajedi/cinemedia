import styles from './Banner.module.scss';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import { imageBase } from '../../data/imagePaths';

const Banner = () => {
  const { show } = useSelector((state) => state.show);
  const { id } = useParams();

  return (
    <div className={styles.bannerContainer}>
      <header className={styles.banner}>
        <img src={`${imageBase}w342${show.poster_path}`} alt="Poster" />
        <div className={styles.showInfo}>
          <h2>
            {show.name} <span> ({show.first_air_date?.slice(0, 4)}) </span>
          </h2>
          <Link to={`/shows/${id}`}>
            <BsArrowLeftShort /> Back to main
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Banner;
