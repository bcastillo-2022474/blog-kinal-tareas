import { useEffect, useState } from "react";
import CommentCard from "./CommentCard.tsx";
import { Comment } from "../types";
import { API_URL } from "../config.ts";

function CommentCardContainer({
  shouldUpdate,
  setShouldUpdate,
}: {
  shouldUpdate: boolean;
  setShouldUpdate: (value: boolean) => void;
}) {
  const [comments, setComments] = useState<Comment[]>([]);
  const postName = "HRS-frontend";

  useEffect(() => {
    if (!shouldUpdate) return;

    setShouldUpdate(false);
  }, [shouldUpdate]);

  useEffect(() => {
    if (!shouldUpdate) return;

    fetch(`${API_URL}/comments/${postName}/`)
      .then((res) => res.json())
      .then(({ data }) => {
        setComments(data);
      })
      .catch((err) => console.error(err));
  }, [shouldUpdate]);

  return (
    <div className="flex flex-col gap-2">
      {comments.map((comment: Comment) => {
        return (
          <CommentCard
            key={comment._id}
            username={comment.username}
            createdAt={comment.createdAt}
            content={comment.content}
            publication={comment.publication}
            parent={comment.parent}
            _id={comment._id}
            onFormSubmit={() => {
              setShouldUpdate(true);
            }}
            postName={postName}
          />
        );
      })}
    </div>
  );
}

export default CommentCardContainer;
