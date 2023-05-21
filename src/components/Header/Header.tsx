import React, { FC, FormEvent, useEffect, useState } from 'react';
import { NavLink, useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import { routes } from '../../service/helper';
import './Header.css';

export const Header: FC = () => {
  const { pathname, search } = useLocation();
  const history = useHistory();
  const isUserMatch = useRouteMatch(routes.user);

  const searchName = new URLSearchParams(search).get('query') ?? '';

  const [link, setLink] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!searchValue.trim().length) {
      return;
    }

    history.push({ search: `?query=${searchValue}`, pathname: '/search' });
    setSearchValue('');
  };

  useEffect(() => {
    if (searchName) {
      setLink('поиск');
      return;
    }

    if (isUserMatch) {
      const id = new URLSearchParams(isUserMatch?.params).get('id') ?? '';
      setLink(id);
      return;
    }

    setLink('');
  }, [searchName, pathname]);

  return (
    <header className="header">
      <div className="container header__container">
        <nav className="header__navigation">
          <ul className="header__navigation-list">
            <li className="header__navigation-list-item">
              <NavLink
                to={routes.home}
                className="header__navigation-link"
                activeClassName="header__navigation-link--active"
                isActive={() => {
                  if (pathname === routes.home || pathname === routes.users) {
                    return true;
                  }
                  return false;
                }}
              >
                Пользователи гитхаба
              </NavLink>
            </li>
            {link && (
              <li className="header__navigation-list-item">
                <a className="header__navigation-link header__navigation-link--user">{link}</a>
              </li>
            )}
          </ul>
        </nav>

        <div className="header__search">
          <form className="header__search-form" onSubmit={onSubmit}>
            <input
              type="search"
              className="header__search-input"
              placeholder="Поиск пользователя"
              value={searchValue}
              onChange={(event) => setSearchValue(event.currentTarget.value)}
            />
            <button type="submit" className="header__search-button">
              Найти
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
