import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from 'components/Loader/Loader';
import HelmetWrapper from 'components/HelmetWrapper/HelmetWrapper';
import { PageTitles } from 'constants/pageTitles';
import { ROUTES } from 'constants/routes';

const NotFound = lazy(() => import('pages/NotFound/NotFound'));
const NavPage = lazy(() => import('pages/NavPage/NavPage'));
const Citizens = lazy(() => import('pages/Citizens/Citizens'));
const Volunteers = lazy(() => import('pages/Volunteers/Volunteers'));
const AdminsRoom = lazy(() => import('pages/AdminsRoom/AdminsRoom'));

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<NavPage />} />

        <Route
          path={ROUTES.citizens}
          element={
            <HelmetWrapper helmetTitle={PageTitles.CITIZENS}>
              <Citizens />
            </HelmetWrapper>
          }
        />

        <Route
          path={ROUTES.volunteers}
          element={
            <HelmetWrapper helmetTitle={PageTitles.VOLUNTEERS}>
              <Volunteers />
            </HelmetWrapper>
          }
        />

        <Route
          path={ROUTES.admins_room}
          element={
            <HelmetWrapper helmetTitle={PageTitles.ADMINS_ROOM}>
              <AdminsRoom />
            </HelmetWrapper>
          }
        />

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
