import * as Knex from 'knex';
import * as cleaner from 'knex-cleaner';

export const seed = async (knex: Knex): Promise<any> => (cleaner
  .clean(knex, {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
  })
);

export default {};
