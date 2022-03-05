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

      <h5 className={styles.subtitle}>Сторінку не знайдено</h5>

      {from ? (
        <p className={styles.text}>Сторінка &quot;{from}&quot; не існує.</p>
      ) : (
        <p className={styles.text}>Сторінка, яку ви шукаєте, не існує.</p>
      )}

      <Link className={styles.go_root_btn} to={ROUTES.root}>
        Перейдіть на домашню сторінку
      </Link>
    </div>
  );
};

export default NotFound;
