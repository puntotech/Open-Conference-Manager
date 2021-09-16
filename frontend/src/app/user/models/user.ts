import { SocialUser } from "angularx-social-login";
import { Talk } from "src/app/talks/models/talk.model";

export interface User extends SocialUser {
  talks: Talk[];
  bio?: string;
  city?: string;
  company?: string;
  twitter?: string;
  github?: string;
  youtube?: string;
  linkedin?: string;
  tagline?: string;
}
