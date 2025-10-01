import { env } from './config/env.js';
import app from './app.js';
import logger from './config/logger.js';

const PORT = env.PORT || 3000;

const startServer = async () => {
  try {
    app.listen(PORT, () => {
      logger.info(`Server is running on PORT: ${PORT}`);
    });
  } catch (error) {
    logger.error(`Failed to start server ${error}`);
    process.exit(1);
  }
};

startServer();
