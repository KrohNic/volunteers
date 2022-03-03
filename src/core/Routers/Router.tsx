import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from 'components/Loader/Loader';
// import { ROUTES } from 'constants/routes';
import HelmetWrapper from 'components/HelmetWrapper/HelmetWrapper';
import { PageTitles } from 'constants/pageTitles';

const NotFound = lazy(() => import('pages/NotFound/NotFound'));
const NavPage = lazy(() => import('pages/NavPage/NavPage'));

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<NavPage />} />
        <Route
          path='*'
          element={
            <HelmetWrapper helmetTitle={PageTitles.NOT_FOUND}>
              <NotFound />
            </HelmetWrapper>
          }
        />
      </Routes>
    </Suspense>
  );
};

export default Router;
