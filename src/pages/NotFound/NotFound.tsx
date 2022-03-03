import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import type { LocationFromState } from 'types/types';

import { ROUTES } from 'constants/routes';

import styles from './NotFound.module.scss';

const NotFound = () => {
  const { state } = useLocation();
  const from = (state as LocationFromState)?.from;

  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>404</h1>

      <h5 className={styles.subtitle}>Page not found</h5>

      {from ? (
        <p className={styles.text}>
          The Page &quot;{from}&quot; does not exist.
        </p>
      ) : (
        <p className={styles.text}>
          The Page you are looking for does not exist.
        </p>
      )}

      <Link className={styles.go_root_btn} to={ROUTES.root}>
        Go to the home page
      </Link>
    </div>
  );
};

export default NotFound;
