import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import { env } from '../config/env.js';
import * as schema from './schema.js';
import logger from '../config/logger.js';

const db = drizzle(env.DATABASE_URL, {
  schema,
  logger: {
    logQuery(query, params) {
      logger.debug(
        {
          query,
          params: env.NODE_ENV === 'production' ? '[REDACTED]' : params,
        },
        'DB query'
      );
    },
  },
});

export { db };
