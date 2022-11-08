import { useAppSelector } from '../../hooks';
import ShowsCard from './ShowsCard';
import styles from './ShowsGrid.module.scss';

const ShowsGrid = () => {
  const { results, filterMenuOpen } = useAppSelector((state) => state.show);

  return (
    <section
      className={`${styles.grid} ${filterMenuOpen ? styles.menuOpen : ''} ${
        styles[results.length]
      }`}
    >
      {results.map((entry) => {
        return (
          entry.poster_path && (
            <ShowsCard {...entry} key={`${entry.id}${entry.popularity}`} />
          )
        );
      })}
    </section>
  );
};

export default ShowsGrid;
