export const routes: { [key: string]: string } = {
  home: '/',
  users: '/users',
  user: '/users/:id',
  search: '/search',
};

const getEnding = (count: number, single: string, several: string, plural: string) => {
  const rest = count % 10;
  if (count > 10 && count < 20) return plural;
  if (rest > 1 && rest < 5) return several;
  if (rest == 1) return single;
  return plural;
};

export const getRepoWordEnding = (count?: number) => {
  if (!count) return 'репозиториев';
  return getEnding(count, 'репозиторий', 'репозитория', 'репозиториев');
};

export const getFollowerWordEnding = (count?: number) => {
  if (!count) return 'подписчиков';
  if (count > 999) return 'подписчиков';
  return getEnding(count, 'подписчик', 'подписчика', 'подписчиков');
};

export const getFollowingWordEnding = (count?: number) => {
  if (!count) return 'подписок';
  if (count > 999) return 'подписок';
  return getEnding(count, 'подписка', 'подписки', 'подписок');
};

export const getShortNotation = (notation?: number) => {
  if (!notation) return 0;
  if (notation < 1000) return notation;
  return `${Number(notation / 1000).toFixed(1)}k`;
};
