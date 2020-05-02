import * as Knex from 'knex';

import * as Config from '../../knexfile';

export default Knex(Config[process.env.NODE_ENV]);
