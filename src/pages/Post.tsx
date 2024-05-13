import { Link, useLoaderData } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import { ForwardedRef, forwardRef, useEffect, useRef, useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import { Comment } from "../types";

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
      <div className="px-20 flex flex-col gap-7 text-start">
        <div>
          <h3 className="font-bold pb-7 dark:text-white">1 comment</h3>
          <CommentCard
            date={"Aug 15, 2023"}
            username={"Username"}
            content={"Hola jaja"}
          />
        </div>
        <Form />
      </div>
    </>
  );
}

const CommentCard = ({ username, date, content }: Comment) => {
  const [formVisible, setFormVisible] = useState(false);
  const formRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!formVisible) return;

    console.log({ form: formRef.current });
    formRef.current?.focus();
  }, [formVisible]);

  return (
    <div className="">
      <div className="py-2 px-5 border border-neutral-400/50 bg-white dark:bg-[#22272e] text-white rounded-t border-b-0 flex flex-col gap-3">
        <div className="flex gap-3 items-center w-full text-neutral-500">
          <div className="rounded-full size-[35px] bg-indigo-900/75"></div>
          <div>{username}</div>
          <div>{date}</div>
        </div>
        <span className="text-black dark:text-inherit">{content}</span>
        <div className="flex justify-between text-[#768390] text-sm">
          <div className="flex gap-2 items-center">
            <IconArrowUp size="14" className="cursor-pointer" />
            <span>1</span>
          </div>
          <span>0 replies</span>
        </div>
      </div>
      {!formVisible && (
        <div className="px-5 py-3 dark:bg-[#2d333b] bg-[#f6f8fa] border border-neutral-400/50">
          <input
            onFocus={() => {
              setFormVisible(true);
            }}
            type="text"
            className="px-2 py-1 placeholder:text-[#768390] text-white dark:bg-[#22272e] rounded w-full border border-neutral-400/50"
            placeholder="Write a reply"
          />
        </div>
      )}
      {formVisible && (
        <Form
          ref={formRef}
          showCancel
          onCancel={() => {
            setFormVisible(false);
          }}
        />
      )}
    </div>
  );
};

const Form = forwardRef(function Form(
  {
    onCancel,
    showCancel,
  }: {
    onCancel?: () => void;
    showCancel?: boolean;
  },
  ref?: ForwardedRef<HTMLTextAreaElement>,
) {
  return (
    <div className="flex flex-col rounded">
      <div className="px-2 pt-3 border border-black rounded-t border-neutral-400/50 dark:bg-[#2d333b] bg-[#f6f8fa]">
        <span className="bg-white dark:bg-[#22272e] dark:text-white h-full px-3 py-2 border-x border-t border-black border-neutral-400/50">
          Write
        </span>
      </div>
      <div className="p-2 bg-white border border-black border-neutral-400/50 border-t-0 dark:bg-[#22272e] rounded-b">
        <textarea
          ref={ref}
          className="bg-[#f6f8fa] dark:bg-[#1c2128] w-full px-2 py-1 focus:outline-none caret-indigo-600 dark:text-white border border-neutral-400/50"
          placeholder="Write a comment..."
          rows="5"
        ></textarea>
        <div className="flex justify-end pt-2 gap-3">
          {showCancel && (
            <button
              onClick={onCancel}
              className="dark:bg-[#373e47] text-black dark:text-[#768390] text-sm px-3 py-1 border border-neutral-400/50 rounded bg-[#f6f8fa]"
            >
              Cancel
            </button>
          )}
          <button className="bg-[#347d39] text-white rounded-md px-3 py-1 text-xs outline-none focus:ring-1 ring-offset-2 ring-[#347d39]">
            Comment
          </button>
        </div>
      </div>
    </div>
  );
});
