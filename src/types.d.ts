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
  date: string;
  username: string;
  content: string;
};
