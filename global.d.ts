declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      JWT_KEY: string;
      DB_HOST: string;
      DB_PORT: string;
      DB_USERNAME: string;
      DB_NAME: string;
      PATH_FOLDER_LOGES: string;
      APP_NAME: string;
    }
  }
}

export {};
