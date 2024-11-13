export const checkingEnvVariables = () => {
  if (!process.env.PORT) {
    throw new Error('PORT must be defined!');
  }
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined!');
  }
  if (!process.env.DB_HOST) {
    throw new Error('DB_HOST must be defined!');
  }
  if (!process.env.DB_PORT) {
    throw new Error('DB_PORT must be defined!');
  }
  if (!process.env.DB_USERNAME) {
    throw new Error('DB_USERNAME must be defined!');
  }
  if (!process.env.DB_NAME) {
    // either of them should be defined
    throw new Error('DB_NAME must be defined!');
  }
  if (process.env.PATH_FOLDER_LOGES) {
    throw new Error('PATH_FOLDER_LOGES must be defined!');
  }
};
