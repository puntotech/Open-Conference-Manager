export interface Talk {
  id: number;
  title: string;
  abstract: string;
  language: string;
  level: string;
  comments: string;
  submitted?: Date;
  createdAt: Date;
  speakers: Speaker[];
}

export interface Speaker {
  id: number;
}
