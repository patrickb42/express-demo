import * as Knex from 'knex';

import type { UserCreds } from '../../types';

// import { UserCreds } from '../../types';

const data: UserCreds[] = [
  {
    username: 'user1',
    password: '$2y$12$pwa8TuNi0s/DINahO81WCu17ALd1alHks.27zvS1o/E2jO48c3zly',
  },
  {
    username: 'user2',
    password: '$2y$12$pwa8TuNi0s/DINahO81WCu17ALd1alHks.27zvS1o/E2jO48c3zly',
  },
  {
    username: 'user3',
    password: '$2y$12$pwa8TuNi0s/DINahO81WCu17ALd1alHks.27zvS1o/E2jO48c3zly',
  },
];

export const seed = async (knex: Knex): Promise<any> => (knex('user_creds').insert(data));

export default {};
