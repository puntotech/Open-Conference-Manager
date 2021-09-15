import { SocialUser } from "angularx-social-login";

export interface User extends SocialUser {
  bio?: string;
  city?: string;
  company?: string;
  twitter?: string;
  github?: string;
  youtube?: string;
  linkedin?: string;
  tagline?: string;
}
