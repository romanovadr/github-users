import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getFollowerWordEnding, getFollowingWordEnding, getShortNotation } from '../../service/helper';
import { Repo, User } from '../../types/types';
import UserService from '../../service/UserService';
import './UserProfilePage.css';

export const UserProfilePage: FC = () => {
  const { id }: { id: string } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    UserService.fetchUserData(id)
      .then((result) => {
        setUser(result);
        return UserService.fetchExtraInfo(result?.repos_url);
      })
      .then((result) => {
        setRepos(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <main>
        <div className="container">
          {loading ? (
            <h1 className="title">Загрузка данных пользователя...</h1>
          ) : (
            <>
              <section className="user-profile">
                <div className="user-profile__image-container">
                  <img className="user-profile__image" src={user?.avatar_url} alt={`${user?.login} profile photo`} />
                </div>
                <div className="user-profile__content">
                  <h1 className="user-profile__title">
                    {user?.name && `${user.name}, `} <span className="user-profile__accent">{user?.login}</span>
                  </h1>
                  <p className="user-profile__text">
                    <span className="user-profile__accent">{getShortNotation(user?.followers)}</span>{' '}
                    {getFollowerWordEnding(user?.followers)} ·{' '}
                    <span className="user-profile__accent">{getShortNotation(user?.following)}</span>{' '}
                    {getFollowingWordEnding(user?.following)}{' '}
                    {user?.blog && (
                      <>
                        ·{' '}
                        <a href={user?.blog} className="link" target="_blank" rel="noreferrer">
                          {user?.blog}
                        </a>
                      </>
                    )}
                  </p>
                </div>
              </section>

              <section className="repository-list">
                <div className="repository-list__header">
                  <h2 className="repository-list__title">Репозитории</h2>
                  <a href={`${user?.html_url}?tab=repositories`} className="link" target="_blank" rel="noreferrer">
                    Все репозитории
                  </a>
                </div>

                {repos?.length ? (
                  <div className="repository-list__container">
                    {repos?.map(({ id, html_url, name, description }) => (
                      <section className="repository-list__item" key={id}>
                        <h3 className="repository-list__item-title">
                          <a href={html_url} className="link" target="_blank" rel="noreferrer">
                            {name}
                          </a>
                        </h3>
                        <p className="repository-list__item-text">{description}</p>
                      </section>
                    ))}
                  </div>
                ) : (
                  <h2 className="repository-list__title">Данные о репозиториях пользователя отсутствуют</h2>
                )}
              </section>
            </>
          )}
        </div>
      </main>
    </>
  );
};
