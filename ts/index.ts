import * as Dotenv from 'dotenv';

import server from './server';

Dotenv.config();

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
