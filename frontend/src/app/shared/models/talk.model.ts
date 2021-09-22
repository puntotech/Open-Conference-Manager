import { User } from "./user";

export interface Talk {
  id: number;
  title: string;
  abstract: string;
  language: string;
  level: string;
  track: string;
  comments: string;
  submitted?: Date;
  createdAt: Date;
  speakerId: number;
}

export interface TalkWithStatus extends Talk {
  speakerTalkStatus: SpeakerTalkStatus[];
}

export interface SpeakerTalkStatus {
  speakerId: number;
  admin: boolean;
  createdAt: Date;
  talkId: number;
  speaker: User;
}
