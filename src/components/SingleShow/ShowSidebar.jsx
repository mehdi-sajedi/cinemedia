import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';
import { MdOutlineLink } from 'react-icons/md';
import { formatDate } from '../../utilities/utilities';
import styles from './ShowSidebar.module.scss';
import { useSelector } from 'react-redux';
import { imageBase } from '../../data/imagePaths';

const ShowSidebar = () => {
  const { show } = useSelector((state) => state.show);

  const socials = [
    {
      base: 'https://instagram.com/',
      id: show.external_ids?.instagram_id,
      icon: BsInstagram,
      keyID: 9823479237498,
    },
    {
      base: 'https://facebook.com/',
      id: show.external_ids?.facebook_id,
      icon: BsFacebook,
      keyID: 1458972394879,
    },
    {
      base: 'https://twitter.com/',
      id: show.external_ids?.twitter_id,
      icon: BsTwitter,
      keyID: 7849236987293,
    },
    {
      base: '',
      id: show.homepage,
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

      {(show.external_ids?.length > 0 || show.homepage) && (
        <div className={styles.line}></div>
      )}
      <div className={styles.info}>
        <div className={styles.status}>
          <h4>Status</h4>
          <p>{show.status}</p>
        </div>
        <div className={styles.seasons}>
          <h4>Seasons</h4>
          <p>{show.number_of_seasons}</p>
        </div>
        <div className={styles.episodes}>
          <h4>Episodes</h4>
          <p>{show.number_of_episodes}</p>
        </div>
        <div className={styles.lastAir}>
          <h4>Last Air Date</h4>
          <p>{formatDate(show.last_air_date?.replace(/-/g, '/'), 'short')}</p>
        </div>
        <div className={styles.network}>
          {show.networks?.length > 0 && (
            <>
              <h4>Network</h4>
              <img
                src={`${imageBase}original${show.networks[0].logo_path}`}
                alt=""
              />
            </>
          )}
        </div>
      </div>
    </aside>
  );
};

export default ShowSidebar;
