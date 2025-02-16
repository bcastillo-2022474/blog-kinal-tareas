import { useEffect, useRef, useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import { Comment } from "../types";
import Form from "./Form.tsx";
import { API_URL } from "../config.ts";

type CommentCardProps = {
  onFormSubmit: (form: Omit<Comment, "createdAt" | "_id">) => void;
  postName: string;
};

const CommentCard = ({
  username,
  createdAt,
  content,
  publication,
  onFormSubmit,
  _id,
  postName,
}: Comment & CommentCardProps) => {
  const [formVisible, setFormVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/comments/${postName}/${_id}`)
      .then((res) => res.json())
      .then(({ data }) => {
        setComments(data);
      })
      .catch((err) => console.error(err));
  }, []);

  const formRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!formVisible) return;

    formRef.current?.focus();
  }, [formVisible]);

  return (
    <div>
      <div className="py-2 px-5 border border-neutral-400/50 bg-white dark:bg-[#22272e] text-white rounded-t border-b-0 flex flex-col gap-3">
        <div className="flex gap-3 items-center w-full text-neutral-500">
          <div className="rounded-full size-[35px] bg-indigo-900/75"></div>
          <div>{username}</div>
          <div>
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "full",
            }).format(new Date(createdAt))}
          </div>
        </div>
        <span className="text-black dark:text-inherit">{content}</span>
        <div className="flex justify-between text-[#768390] text-sm">
          <div className="flex gap-2 items-center">
            <IconArrowUp size="14" className="cursor-pointer" />
            <span>1</span>
          </div>
          <span>{comments.length} replies</span>
        </div>
      </div>
      {comments.length > 0 && (
        <div className="py-2 px-5 border border-neutral-400/50 bg-[#f6f8fa] dark:bg-[#1c2128] rounded-t border-b-0 flex flex-col gap-3">
          {comments.map((comment: Comment) => {
            return (
              <div
                key={comment._id}
                className="grid grid-cols-[35px,1fr] gap-x-3 gap-y-1 justify-center dark:text-[#768390]"
              >
                <div className="rounded-full bg-red-500 size-[35px]"></div>
                <div className="flex gap-3 text-sm items-center">
                  <span className="font-bold dark:text-neutral-100">
                    {comment.username}
                  </span>
                  <span>
                    {Intl.DateTimeFormat("en-US", {
                      dateStyle: "full",
                    }).format(new Date(comment.createdAt))}
                  </span>
                </div>
                <div className="flex justify-center">
                  <div className="w-[2px] bg-neutral-500 pt-7 pb-2"></div>
                </div>
                <div className="text-black self-end dark:text-neutral-300">
                  {comment.content}
                </div>
              </div>
            );
          })}
        </div>
      )}
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
          publication={publication}
          {...(_id && { parent: _id })}
          ref={formRef}
          showCancel
          onSubmit={(form) => {
            fetch(`${API_URL}/comments/${postName}/${_id}`)
              .then((res) => res.json())
              .then(({ data }) => {
                setComments(data);
                formRef.current?.focus();
              })
              .catch((err) => console.error(err))
              .finally(() => onFormSubmit(form));
          }}
          onCancel={() => {
            setFormVisible(false);
          }}
        />
      )}
    </div>
  );
};

export default CommentCard;
