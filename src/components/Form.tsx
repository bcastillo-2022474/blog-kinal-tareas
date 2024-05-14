import { ForwardedRef, forwardRef, useState } from "react";
import { Comment } from "../types";
import { API_URL } from "../config.ts";

const Form = forwardRef(function Form(
  {
    onCancel,
    showCancel,
    publication,
    parent,
    onSubmit,
  }: {
    publication: string;
    onSubmit: (form: Omit<Comment, "createdAt" | "_id">) => void;
    parent?: string;
    onCancel?: () => void;
    showCancel?: boolean;
  },
  ref?: ForwardedRef<HTMLInputElement>,
) {
  const [form, setForm] = useState({
    username: "",
    content: "",
  });

  async function postComment(form: Omit<Comment, "createdAt" | "_id">) {
    fetch(`${API_URL}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
      .then((res) => res.json())
      .catch((err) => console.error(err));
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        postComment({ ...form, publication, parent }).then(() => {
          onSubmit({ ...form, publication, parent });
          setForm({
            username: "",
            content: "",
          });
        });
      }}
      className="flex flex-col rounded"
    >
      <div className="px-2 pt-3 border border-black rounded-t border-neutral-400/50 dark:bg-[#2d333b] bg-[#f6f8fa]">
        <span className="bg-white dark:bg-[#22272e] dark:text-white h-full px-3 py-2 border-x border-t border-black border-neutral-400/50">
          Write
        </span>
      </div>
      <div className="p-2 bg-white border border-black border-neutral-400/50 border-t-0 dark:bg-[#22272e] rounded-b flex flex-col gap-2">
        <input
          value={form.username}
          onChange={(e) => {
            setForm({
              ...form,
              username: e.target.value,
            });
          }}
          ref={ref}
          type="text"
          className="outline-none outline-offset-0 focus:outline-1 focus:outline-green-500 px-2 py-1 placeholder:text-[#768390] dark:text-white bg-[#f6f8fa] dark:bg-[#1c2128] rounded w-full border border-neutral-400/50"
          placeholder="Username"
        />
        <textarea
          value={form.content}
          onChange={(e) => {
            setForm({
              ...form,
              content: e.target.value,
            });
          }}
          className="bg-[#f6f8fa] dark:bg-[#1c2128] w-full px-2 py-1 outline-none outline-offset-0 focus:outline-1 focus:outline-green-500 caret-indigo-600 dark:text-white border border-neutral-400/50"
          placeholder="Write a comment..."
          rows={5}
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
    </form>
  );
});

export default Form;
