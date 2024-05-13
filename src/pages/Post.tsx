import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import { useRef } from "react";
import { IconArrowUp } from "@tabler/icons-react";

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
interface BlogPost {
  title: string;
  date: string;
  tags: string[];
  content: BlockElement[];
}

export default function Post() {
  const { posts } = useLoaderData() as { posts: Record<string, BlogPost> };
  console.log(posts);
  const ref = useRef<HTMLDivElement>(null);
  const post = posts["HRS-frontend"];

  return (
    <>
      <Navbar />
      <div className="flex flex-col px-10 dark:text-neutral-100">
        <h1 className="text-5xl text-start font-bold">{post.title}</h1>
        <div className="flex flex-col gap-3 py-2">
          <p className="text-start">Published some day lol</p>
          <div className="flex gap-2 text-neutral-100 text-xs">
            {post.tags.map((tag) => (
              <span className="px-2 py-1 bg-slate-700 dark:bg-slate-200 dark:text-slate-700 rounded-lg">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <article className="py-10 text-start flex flex-col gap-7 text-lg">
          {post.content.map((element) => {
            if (element.type === "heading" && element.level === 2) {
              const id = element.text.toLowerCase().replaceAll(" ", "-");

              return (
                <h2
                  id={id}
                  className="text-3xl font-bold flex gap-2 items-center scroll-m-16"
                  key={element.text}
                  onClick={() => {
                    ref.current?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  ref={ref}
                >
                  <span>{element.text}</span>
                  <Link
                    to={`#${id}`}
                    className="text-rose-300 hover:text-rose-600 cursor-pointer text-xl"
                  >
                    #
                  </Link>{" "}
                </h2>
              );
            }

            if (element.type === "paragraph") {
              return (
                <p>
                  {element.content.map((inlineElement) => {
                    if (inlineElement.type === "text") {
                      return <span>{inlineElement.value}</span>;
                    }
                    if (inlineElement.type === "link") {
                      return (
                        <a
                          className="font-semibold text-rose-700 dark:text-rose-300 hover:underline cursor-pointer"
                          href={inlineElement.url}
                          target="_blank"
                        >
                          {inlineElement.text}
                        </a>
                      );
                    }
                    if (inlineElement.type === "strong") {
                      return (
                        <strong className="font-bold">
                          {inlineElement.text}
                        </strong>
                      );
                    }
                    if (inlineElement.type === "code") {
                      return (
                        <span className="bg-neutral-100 text-xl px-2 rounded text-purple-700 dark:bg-slate-800 dark:text-purple-400">
                          {inlineElement.text}
                        </span>
                      );
                    }
                  })}
                </p>
              );
            }

            return <div>hola</div>;
          })}
        </article>
      </div>
      <div className="px-20 flex flex-col text-start">
        <div>
          <h3 className="font-bold pb-7">1 comment</h3>
          <div className="py-2 px-5 border bg-white rounded flex flex-col gap-3">
            <div className="flex gap-3 items-center w-full text-neutral-500">
              <div className="rounded-full size-[35px] bg-red-600"></div>
              <div>Username</div>
              <div>Aug 15, 2023</div>
            </div>
            <span>Hola</span>
            <div className="flex justify-between text-gray-600 text-sm">
              <div className="flex gap-2 items-center">
                <IconArrowUp size="14" className="cursor-pointer" />
                <span>1</span>
              </div>
              <span>0 replies</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="px-2 pt-2">
            <span className="bg-white h-full px-3 py-2 border-x border-t border-black">
              Write
            </span>
          </div>
          <div className="p-2 bg-white">
            <textarea
              className="bg-neutral-300 w-full px-2 py-1"
              placeholder="Write a comment..."
              rows="5"
            ></textarea>
          </div>
        </div>
      </div>
    </>
  );
}
