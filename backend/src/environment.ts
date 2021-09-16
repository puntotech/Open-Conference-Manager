import { config } from 'dotenv';

config();

const env = process.env;

export const environment = {
  port: Number(env.PORT || 3000),
  proxyEnabled: env.PROXY_ENABLED === 'true',
  frontEndUrl: env.FRONTEND_URL,
  accessTokenSecret: env.ACCESS_TOKEN_SECRET,
  accessTokenExpiration: env.ACCESS_TOKEN_EXPIRATION,
  refreshTokenSecret: env.REFRESH_TOKEN_SECRET,
  refreshTokenExpiration: env.REFRESH_TOKEN_EXPIRATION,
};