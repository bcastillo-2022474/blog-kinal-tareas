import { ReactNode } from "react";

export type Project = {
  title: string;
  description: string;
  date: Date;
  label: ReactNode;
  github: string;
  url: string;
  post_url: string;
};

export type Comment = {
  createdAt: string;
  username: string;
  content: string;
  publication: string;
  parent?: string;
  _id: string;
};
