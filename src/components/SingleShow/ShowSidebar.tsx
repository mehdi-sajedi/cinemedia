import { useAppSelector } from '../../hooks';
import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';
import { MdOutlineLink } from 'react-icons/md';
import { formatDate } from '../../utilities/utilities';
import styles from './ShowSidebar.module.scss';
import { imageBase } from '../../data/imagePaths';

const ShowSidebar = () => {
  const { show } = useAppSelector((state) => state.show);

  const socials = [
    {
      base: 'https://instagram.com/',
      id: show?.external_ids?.instagram_id,
      icon: BsInstagram,
      keyID: 9823479237498,
      name: 'Instagram',
    },
    {
      base: 'https://facebook.com/',
      id: show?.external_ids?.facebook_id,
      icon: BsFacebook,
      keyID: 1458972394879,
      name: 'Facebook',
    },
    {
      base: 'https://twitter.com/',
      id: show?.external_ids?.twitter_id,
      icon: BsTwitter,
      keyID: 7849236987293,
      name: 'Twitter',
    },
    {
      base: '',
      id: show?.homepage,
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
                  aria-label={`${show?.name} ${social.name}`}
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
          <p>{show?.status}</p>
        </div>
        <div>
          <h3>Seasons</h3>
          <p>{show?.number_of_seasons}</p>
        </div>
        <div>
          <h3>Episodes</h3>
          <p>{show?.number_of_episodes}</p>
        </div>
        <div>
          <h3>Last Air Date</h3>
          {show?.last_air_date && (
            <p>{formatDate(show.last_air_date.replace(/-/g, '/'), 'short')}</p>
          )}
        </div>
        <div className={styles.network}>
          {show?.networks && show.networks.length > 0 && (
            <>
              <h3>Network</h3>
              <img
                src={`${imageBase}original${show?.networks[0].logo_path}`}
                alt={show?.networks[0].name}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowSidebar;
