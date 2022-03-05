import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from 'components/Loader/Loader';
import HelmetWrapper from 'components/HelmetWrapper/HelmetWrapper';
import { PageTitles } from 'constants/pageTitles';
import { ROUTES } from 'constants/routes';

const NotFound = lazy(() => import('pages/NotFound/NotFound'));
const Login = lazy(() => import('pages/Login/Login'));
const NavPage = lazy(() => import('pages/NavPage/NavPage'));
const CitizenInfo = lazy(() => import('pages/CitizenInfo/CitizenInfo'));
const CitizenForm = lazy(() => import('pages/CitizenForm/CitizenForm'));
const Volunteers = lazy(() => import('pages/Volunteers/Volunteers'));
const AdminsRoom = lazy(() => import('pages/AdminsRoom/AdminsRoom'));
const ProtectedRoute = lazy(() => import('core/ProtectedRoute/ProtectedRoute'));

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<NavPage />} />

        <Route
          path={ROUTES.login}
          element={
            <HelmetWrapper helmetTitle={PageTitles.LOGIN}>
              <Login />
            </HelmetWrapper>
          }
        />

        <Route
          path={`${ROUTES.citizens}/:formId`}
          element={
            <ProtectedRoute>
              <HelmetWrapper helmetTitle={PageTitles.CITIZENS}>
                <CitizenInfo />
              </HelmetWrapper>
            </ProtectedRoute>
          }
        />

        <Route
          path={ROUTES.citizens}
          element={
            <HelmetWrapper helmetTitle={PageTitles.CITIZENS}>
              <CitizenForm />
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
            <ProtectedRoute>
              <HelmetWrapper helmetTitle={PageTitles.ADMINS_ROOM}>
                <AdminsRoom />
              </HelmetWrapper>
            </ProtectedRoute>
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
