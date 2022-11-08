import { useAppSelector } from '../../hooks';
import MoviesCard from './MoviesCard';
import styles from './MoviesGrid.module.scss';

const MoviesGrid = () => {
  const { results, filterMenuOpen } = useAppSelector((state) => state.movie);

  return (
    <section
      className={`${styles.grid} ${filterMenuOpen ? styles.menuOpen : ''} ${
        styles[results.length]
      }`}
    >
      {results.map((entry) => {
        return (
          entry.poster_path && (
            <MoviesCard {...entry} key={`${entry.id}${entry.popularity}`} />
          )
        );
      })}
    </section>
  );
};

export default MoviesGrid;
