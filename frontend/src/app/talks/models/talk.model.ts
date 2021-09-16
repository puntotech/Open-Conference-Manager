export interface Talk {
  id: string;
  title: string;
  abstract: string;
  language: string;
  level: string;
  comments: string;
  submitted?: Date;
  createdAt: Date;
  speakers: string[];
}

export interface Speaker {
  name: string;
  language: string;
}
