import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { getRepoWordEnding } from '../../service/helper';
import { User } from '../../types/types';
import './UsersList.css';

interface Props {
  usersList: User[];
}

export const UsersList: FC<Props> = ({ usersList }) => {
  return (
    <div className="users-list">
      {usersList.map(({ id, avatar_url, login, public_repos, company }) => (
        <section className="users-list__item" key={id}>
          <div className="users-list__image-container">
            <img className="users-list__image" src={avatar_url} alt={`${login} profile photo`} />
          </div>
          <div className="users-list__content">
            <h2 className="users-list__title">
              <Link to={`/users/${login}`} className="link">
                {login}
              </Link>
              {`, ${public_repos ?? '0'} ${getRepoWordEnding(public_repos)}`}
            </h2>
            {company && <p className="users-list__text">{company}</p>}
          </div>
        </section>
      ))}
    </div>
  );
};
