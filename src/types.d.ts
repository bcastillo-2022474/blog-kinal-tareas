import { ReactNode } from "react";

export type Project = {
  large_title: string;
  date: string;
  github: string;
  url: string;
  description: string;
  post_url: string;
  tags: string[];
};

export type Comment = {
  createdAt: string;
  username: string;
  content: string;
  publication: string;
  parent?: string;
  _id: string;
};

// posts json schema

// Inline Element Types
interface TextElement {
  type: "text";
  value: string;
}

interface LinkElement {
  type: "link";
  text: string;
  url: string;
}

interface StrongElement {
  type: "strong";
  text: string;
}

interface CodeElement {
  type: "code";
  text: string;
}

type InlineElement = TextElement | LinkElement | StrongElement | CodeElement;

// Block Element Types
interface HeadingElement {
  type: "heading";
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
}

interface ParagraphElement {
  type: "paragraph";
  content: InlineElement[];
}

interface CodeBlockElement {
  type: "codeBlock";
  language: string;
  code: string;
}

type BlockElement = HeadingElement | ParagraphElement | CodeBlockElement;

// Blog Post
export type BlogPost = {
  title: string;
  date: string;
  tags: string[];
  content: BlockElement[];
} & Project;
