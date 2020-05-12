import * as Dotenv from 'dotenv';

Dotenv.config();

// eslint-disable-next-line import/first
import server from './server';


const { PORT } = process.env;

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${PORT}`);
});
