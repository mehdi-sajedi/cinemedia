import styles from './Banner.module.scss';
import { useAppSelector } from '../../hooks';
import { Link, useParams } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';
import { imageBase } from '../../data/imagePaths';

const Banner = () => {
  const { movie } = useAppSelector((state) => state.movie);
  const { id } = useParams();

  return (
    <div className={styles.bannerContainer}>
      <header className={styles.banner}>
        <img src={`${imageBase}w342${movie?.poster_path}`} alt='Poster' />
        <div className={styles.movieInfo}>
          <h1>
            {movie?.title} <span> ({movie?.release_date.slice(0, 4)}) </span>
          </h1>
          <Link to={`/movies/${id}`}>
            <BsArrowLeftShort /> Back to main
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Banner;
