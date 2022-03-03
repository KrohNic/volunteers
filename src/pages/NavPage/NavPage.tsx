import React from 'react';
import { Link } from 'react-router-dom';

import { PageTitles } from 'constants/pageTitles';
import { ROUTES } from 'constants/routes';

import styles from './NavPage.module.scss';

const NavPage = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.nav}>
        <li>
          <Link className={styles.nav_item} to={ROUTES.citizens}>
            {PageTitles.CITIZENS}
          </Link>
        </li>

        <li>
          <Link className={styles.nav_item} to={ROUTES.volunteers}>
            {PageTitles.VOLUNTEERS}
          </Link>
        </li>

        <li>
          <Link className={styles.nav_item} to={ROUTES.admins_room}>
            {PageTitles.ADMINS_ROOM}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavPage;
