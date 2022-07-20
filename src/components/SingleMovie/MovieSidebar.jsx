import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';
import { MdOutlineLink } from 'react-icons/md';
import { formatDate } from '../Utilities/helpers';
import styles from './MovieSidebar.module.scss';
import { useSelector } from 'react-redux';

const MovieSidebar = () => {
  const { movie } = useSelector((state) => state.movie);

  const socials = [
    {
      base: 'https://instagram.com/',
      id: movie.external_ids?.instagram_id,
      icon: BsInstagram,
      keyID: 9823479237498,
    },
    {
      base: 'https://facebook.com/',
      id: movie.external_ids?.facebook_id,
      icon: BsFacebook,
      keyID: 1458972394879,
    },
    {
      base: 'https://twitter.com/',
      id: movie.external_ids?.twitter_id,
      icon: BsTwitter,
      keyID: 7849236987293,
    },
    {
      base: '',
      id: movie.homepage,
      icon: MdOutlineLink,
      keyID: 8386725394781,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.socials}>
        {socials.map(
          (social) =>
            social.id && (
              <li key={`${social.id}-${social.keyID}`}>
                <a
                  href={`${social.base}${social.id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {<social.icon />}
                </a>
              </li>
            )
        )}
      </ul>

      {(movie.external_ids?.length > 0 || movie.homepage) && (
        <div className={styles.line}></div>
      )}
      <div className={styles.info}>
        <div className={styles.status}>
          <h4>Status</h4>
          <p>
            {movie.status}
            {movie.status === 'Released' &&
              ` (${formatDate(
                movie.release_date.replace(/-/g, '/'),
                'short'
              )})`}
          </p>
        </div>
        <div className={styles.budget}>
          <h4>Budget</h4>
          <p>
            {movie.budget > 0
              ? '$' + Number(movie.budget).toLocaleString()
              : '-'}
          </p>
        </div>
        <div className={styles.revenue}>
          <h4>Revenue</h4>
          <p>
            {movie.revenue > 0
              ? '$' + Number(movie.revenue).toLocaleString()
              : '-'}
          </p>
        </div>
      </div>
    </aside>
  );
};

export default MovieSidebar;
