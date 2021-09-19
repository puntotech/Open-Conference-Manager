export interface Talk {
  id: string;
  title: string;
  abstract: string;
  language: string;
  level: string;
  track: string;
  comments: string;
  submitted?: Date;
  createdAt: Date;
  speakers: Speaker[];
}

export interface Speaker {
  id: string;
}
