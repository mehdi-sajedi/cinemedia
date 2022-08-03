import styles from './Banner.module.scss';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { BsArrowLeftShort } from 'react-icons/bs';

const Banner = () => {
  const { movie } = useSelector((state) => state.movie);
  const { id } = useParams();

  return (
    <div className={styles.bannerContainer}>
      <header className={styles.banner}>
        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt="/"
        />
        <div className={styles.movieInfo}>
          <h2>
            {movie.title} <span> ({movie.release_date?.slice(0, 4)}) </span>
          </h2>
          <Link to={`/movies/${id}`}>
            <BsArrowLeftShort /> Back to main
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Banner;
