import React, { useContext } from 'react';
import { AppContext } from '../../context/app-context';
import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';
import { MdOutlineLink } from 'react-icons/md';
import styles from './Sidebar.module.scss';
import _ from 'lodash';

const Sidebar = () => {
  const { appState } = useContext(AppContext);

  const socials = [
    {
      base: 'https://instagram.com/',
      id: appState.currentMedia.external_ids?.instagram_id,
      icon: BsInstagram,
    },
    {
      base: 'https://facebook.com/',
      id: appState.currentMedia.external_ids?.facebook_id,
      icon: BsFacebook,
    },
    {
      base: 'https://twitter.com/',
      id: appState.currentMedia.external_ids?.twitter_id,
      icon: BsTwitter,
    },
    {
      base: '',
      id: appState.currentMedia.homepage,
      icon: MdOutlineLink,
    },
  ];

  return (
    <div className={styles.sidebar}>
      <div className={styles.socials}>
        {socials.map((social) => (
          <a
            href={`${social.base}${social.id}`}
            target="_blank"
            rel="noreferrer"
            key={_.uniqueId()}
          >
            {<social.icon />}
          </a>
        ))}
      </div>
      <div className={styles.status}>
        <h3>Status</h3>
        <p>{appState.currentMedia.status}</p>
      </div>
    </div>
  );
};

export default Sidebar;
