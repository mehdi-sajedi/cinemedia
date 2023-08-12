import { useAppSelector } from '../../hooks';
import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';
import { MdOutlineLink } from 'react-icons/md';
import { formatDate } from '../../utilities/utilities';
import styles from './MovieSidebar.module.scss';

const MovieSidebar = () => {
  const { movie } = useAppSelector((state) => state.movie);

  const socials = [
    {
      base: 'https://instagram.com/',
      id: movie?.external_ids.instagram_id,
      icon: BsInstagram,
      keyID: 9823479237498,
      name: 'Instagram',
    },
    {
      base: 'https://facebook.com/',
      id: movie?.external_ids.facebook_id,
      icon: BsFacebook,
      keyID: 1458972394879,
      name: 'Facebook',
    },
    {
      base: 'https://twitter.com/',
      id: movie?.external_ids.twitter_id,
      icon: BsTwitter,
      keyID: 7849236987293,
      name: 'Twitter',
    },
    {
      base: '',
      id: movie?.homepage,
      icon: MdOutlineLink,
      keyID: 8386725394781,
      name: 'Website',
    },
  ];

  return (
    <div className={styles.sidebar}>
      <ul className={styles.socials}>
        {socials.map(
          (social) =>
            social.id && (
              <li key={`${social.id}-${social.keyID}`}>
                <a
                  href={`${social.base}${social.id}`}
                  target='_blank'
                  rel='noreferrer'
                  aria-label={`${movie?.title} ${social.name}`}
                >
                  {<social.icon />}
                </a>
              </li>
            )
        )}
      </ul>

      {socials.some((s) => s.id) && <div className={styles.line}></div>}
      <div className={styles.info}>
        <div className={styles.status}>
          <h3>Status</h3>
          <p>
            {movie?.status}
            {movie?.status === 'Released' &&
              ` (${formatDate(
                movie?.release_date.replace(/-/g, '/'),
                'short'
              )})`}
          </p>
        </div>
        {movie?.budget! > 0 && (
          <div className={styles.budget}>
            <h3>Budget</h3>
            <p>${Number(movie?.budget).toLocaleString()}</p>
          </div>
        )}
        {movie?.revenue! > 0 && (
          <div className={styles.revenue}>
            <h3>Revenue</h3>
            <p>${Number(movie?.revenue).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSidebar;
