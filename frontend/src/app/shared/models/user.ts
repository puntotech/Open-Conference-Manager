import { SocialUser } from "angularx-social-login";
import { Talk } from "src/app/shared/models/talk.model";

type Talks = {
  [key: string]: Talk;
};
export interface User extends SocialUser {
  talks: Talks;
  bio?: string;
  city?: string;
  company?: string;
  twitter?: string;
  github?: string;
  youtube?: string;
  linkedin?: string;
  tagline?: string;
}

export interface CoSpeakerDto {
  talkId: number;
  speakerId: number;
}
