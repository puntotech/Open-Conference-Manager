import { config } from 'dotenv';

config();

export const authConfig = {
  google: {
    appId: process.env.GOOGLE_CLIENT_ID,
    appSecret: process.env.GOOGLE_SECRET,
  },
  facebook: {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
  },
};
