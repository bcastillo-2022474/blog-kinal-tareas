import CommentCard from "./CommentCard.tsx";
import { Comment } from "../types";

function CommentCardContainer({
  onSubmit,
  postName,
  comments,
}: {
  onSubmit: () => void
  postName: string;
  comments: Comment[]
}) {
  return (
    <>
      <h3 className="font-bold pb-7 dark:text-white">
        {comments.length} comments
      </h3>
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
              onFormSubmit={onSubmit}
              postName={postName}
            />
          );
        })}
      </div>
    </>
  );
}

export default CommentCardContainer;
