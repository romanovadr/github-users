import { User } from '../types/types';
import { GITHUB_TOKEN } from '../config/config';

export default class UserService {
  static baseApiUrl = 'https://api.github.com';

  /** метод получения списка пользователей */
  static fetchUsersList() {
    return fetch(`${this.baseApiUrl}/users`, {
      method: 'get',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then(async (result: User[]) => {
        const usersList = await Promise.all(
          result?.map(async (user) => {
            const info = await this.fetchExtraInfo(user?.url);
            return { ...user, ...info };
          })
        );
        return usersList;
      })
      .catch((err) => {
        console.log('Ошибка получения списка пользователей', err);
        return err;
      });
  }

  /** метод получения списка пользователей по query параметру */
  static fetchQueryUsersList(param: string) {
    return fetch(`${this.baseApiUrl}/search/users?q=${param}`, {
      method: 'get',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then(async (result: { items: User[] }) => {
        const { items } = result;
        const usersList = await Promise.all(
          items?.map(async (user) => {
            const info = await this.fetchExtraInfo(user?.url);
            return { ...user, ...info };
          })
        );
        return usersList;
      })
      .catch((err) => {
        console.log('Ошибка получения списка пользователей', err);
        return err;
      });
  }

  /** метод получения данных пользователя */
  static fetchUserData(username: string | URLSearchParams) {
    return fetch(`${this.baseApiUrl}/users/${username}`, {
      method: 'get',
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((result: User) => result)
      .catch((err) => {
        console.log('Ошибка получения данных пользователя', err);
        return err;
      });
  }

  /** метод получения дополнительных данных пользователя */
  static fetchExtraInfo(url?: string) {
    return fetch(url ?? '', {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((result) => result)
      .catch((err) => {
        console.log('Ошибка получения дополнительных данных пользователя', err);
        return err;
      });
  }
}
