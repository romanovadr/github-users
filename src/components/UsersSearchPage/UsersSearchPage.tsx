import React, { FC, useEffect, useState } from 'react';
import { UsersList } from '../UsersList/UsersList';
import UserService from '../../service/UserService';
import { User } from '../../types/types';

export const UsersSearchPage: FC = () => {
  const searchName = new URLSearchParams(location.search).get('query') ?? '';
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    UserService.fetchQueryUsersList(searchName)
      .then((result) => {
        setUsersList(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [searchName]);

  const renderSearch = () => {
    if (loading) {
      return <h1 className="title">{`Загрузка пользователей по запросу ${searchName}...`}</h1>;
    }
    return (
      <>
        {usersList?.length ? (
          <>
            <h1 className="title">{`Пользователи по запросу ${searchName}`}</h1>
            <UsersList usersList={usersList} />
          </>
        ) : (
          <h1 className="title">{`Ничего не найдено по запросу ${searchName}`}</h1>
        )}
      </>
    );
  };
  return (
    <>
      <main>
        <div className="container">{renderSearch()}</div>
      </main>
    </>
  );
};
