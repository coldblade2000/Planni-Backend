export const MONGODB_ADDRESS = process.env.DB_ADDRESS ? `${process.env.DB_ADDRESS}/banner` : 'localhost:27017/banner';

export const SUCCESS_REDIRECT_URL = `http://localhost:${process.env.PORT | 80}/front`
