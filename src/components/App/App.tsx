import React, { FC, useEffect } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';
import { routes } from '../../service/helper';
import { Header } from '../Header/Header';
import { UserProfilePage } from '../UserProfilePage/UserProfilePage';
import { UsersPage } from '../UsersPage/UsersPage';
import { UsersSearchPage } from '../UsersSearchPage/UsersSearchPage';

export const App: FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route exact path={[routes.home, routes.users]}>
            <UsersPage />
          </Route>
          <Route exact path={routes.user}>
            <UserProfilePage />
          </Route>
          <Route exact path={routes.search}>
            <UsersSearchPage />
          </Route>
          <Route>
            <Redirect to={routes.home} />
          </Route>
        </Switch>
      </main>
    </>
  );
};
