import React, { FC, useEffect, useState } from 'react';
import { UsersList } from '../UsersList/UsersList';
import { User } from '../../types/types';
import UserService from '../../service/UserService';

export const UsersPage: FC = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    UserService.fetchUsersList()
      .then((res) => {
        setUsersList(res);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <main>
        <div className="container">
          {loading ? <h1 className="title">Загрузка пользователей...</h1> : <UsersList usersList={usersList} />}
        </div>
      </main>
    </>
  );
};
