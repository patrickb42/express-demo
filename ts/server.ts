import * as Express from 'express';
import * as Helmet from 'helmet';

import { authRouter } from './routers';

const server = Express();

server.use(Express.json());
server.use(Helmet());

server.use('/api/auth', authRouter);

export default server;
