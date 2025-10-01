import pino from 'pino';
import { env } from './env.js';

const transport = pino.transport({
  targets: [
    {
      target: '@logtail/pino',
      options: {
        sourceToken: env.BETTER_STACK_SOURCE_TOKEN,
        options: { endpoint: env.BETTER_STACK_ENDPOINT },
      },
    },
    {
      target: 'pino-pretty',
    },
  ],
});

const logger = pino(
  {
    level: 'info',
  },
  transport
);

export default logger;
