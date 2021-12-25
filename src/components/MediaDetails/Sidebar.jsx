import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { useLocation } from 'react-router';
import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';
import { MdOutlineLink } from 'react-icons/md';
import { formatDate } from '../Utilities/helpers';
import styles from './Sidebar.module.scss';
import _ from 'lodash';

const posterBase = 'https://image.tmdb.org/t/p/original';

const Sidebar = () => {
  const { appState } = useContext(AppContext);
  const { pathname } = useLocation();

  const media = appState.currentMedia;

  const socials = [
    {
      base: 'https://instagram.com/',
      id: media.external_ids?.instagram_id,
      icon: BsInstagram,
    },
    {
      base: 'https://facebook.com/',
      id: media.external_ids?.facebook_id,
      icon: BsFacebook,
    },
    {
      base: 'https://twitter.com/',
      id: media.external_ids?.twitter_id,
      icon: BsTwitter,
    },
    {
      base: '',
      id: media.homepage,
      icon: MdOutlineLink,
    },
  ];

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.socials}>
        {socials.map(
          (social) =>
            social.id && (
              <li key={_.uniqueId()}>
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

      {(media.external_ids?.length > 0 || media.homepage) && (
        <div className={styles.line}></div>
      )}
      <div className={styles.info}>
        <div className={styles.status}>
          <h4>Status</h4>
          <p>
            {media.status}
            {media.status === 'Released' &&
              ` (${formatDate(media.release_date, 'short')})`}
          </p>
        </div>
        {pathname.includes('shows') ? (
          <>
            <div className={styles.seasons}>
              <h4>Seasons</h4>
              <p>{media.number_of_seasons}</p>
            </div>
            <div className={styles.episodes}>
              <h4>Episodes</h4>
              <p>{media.number_of_episodes}</p>
            </div>
            <div className={styles.lastAir}>
              <h4>Last Air Date</h4>
              <p>{formatDate(media.last_air_date, 'short')}</p>
            </div>
            <div className={styles.network}>
              {media.networks?.length > 0 && (
                <>
                  <h4>Network</h4>
                  <img
                    src={`${posterBase}${media.networks[0].logo_path}`}
                    alt=""
                  />
                </>
              )}
            </div>
          </>
        ) : (
          <>
            <div className={styles.budget}>
              <h4>Budget</h4>
              <p>
                {media.budget > 0
                  ? '$' + Number(media.budget).toLocaleString()
                  : '-'}
              </p>
            </div>
            <div className={styles.revenue}>
              <h4>Revenue</h4>
              <p>
                {media.revenue > 0
                  ? '$' + Number(media.revenue).toLocaleString()
                  : '-'}
              </p>
            </div>
          </>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
