import { Link, useLoaderData, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import { useEffect, useRef, useState } from "react";
import { API_URL } from "../config.ts";
import { Comment } from "../types";
import CommentCardContainer from "../components/CommentCardContainer.tsx";
import Form from "../components/Form.tsx";
import { BlogPost } from "../types";
export default function Post() {
  const { postName } = useParams();
  const { posts } = useLoaderData() as { posts: Record<string, BlogPost> };
  const [comments, setComments] = useState<Comment[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const post = posts[postName!];

  useEffect(() => {
    fetch(`${API_URL}/comments/${postName}/`)
      .then((res) => res.json())
      .then(({ data }) => {
        setComments(data);
      })
      .catch((err) => console.error(err));
  }, [])

  return (
    <>
      <Navbar />
      <div className="flex flex-col px-10 dark:text-neutral-100">
        <h1 className="text-5xl text-start font-bold">{post.title}</h1>
        <div className="flex flex-col gap-3 py-2">
          <p className="text-start">Published some day lol</p>
          <div className="flex gap-2 text-neutral-100 text-xs">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-slate-700 dark:bg-slate-200 dark:text-slate-700 rounded-lg"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <article className="py-10 text-start flex flex-col gap-7 text-lg">
          {post.content.map((element, ind) => {
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
                <p key={ind}>
                  {element.content.map((inlineElement, i) => {
                    if (inlineElement.type === "text") {
                      return <span key={i}>{inlineElement.value}</span>;
                    }
                    if (inlineElement.type === "link") {
                      return (
                        <a
                          key={i}
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
                        <strong key={i} className="font-bold">
                          {inlineElement.text}
                        </strong>
                      );
                    }
                    if (inlineElement.type === "code") {
                      return (
                        <span
                          key={i}
                          className="bg-neutral-100 text-xl px-2 rounded text-purple-700 dark:bg-slate-800 dark:text-purple-400"
                        >
                          {inlineElement.text}
                        </span>
                      );
                    }
                  })}
                </p>
              );
            }

            return <div key={ind}>hola</div>;
          })}
        </article>
      </div>
      <div className="px-20 flex flex-col gap-7 text-start">
        <div>
          <CommentCardContainer
            onSubmit={() => {
              fetch(`${API_URL}/comments/${postName}/`)
                .then((res) => res.json())
                .then(({ data }) => {
                  setComments(data);
                })
                .catch((err) => console.error(err));
            }}
            postName={postName!}
            comments={comments}
          />
        </div>
        <Form
          publication={postName!}
          onSubmit={() => {
            fetch(`${API_URL}/comments/${postName}/`)
              .then((res) => res.json())
              .then(({ data }) => {
                console.log("JEJE")
                console.log({data})
                setComments(data);
              })
              .catch((err) => console.error(err));
          }}
        />
      </div>
    </>
  );
}
