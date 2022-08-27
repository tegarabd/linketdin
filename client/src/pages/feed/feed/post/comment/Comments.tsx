import React from "react";
import ButtonTertiary from "../../../../../components/utilities/button/ButtonTertiary";
import { Comment as CommentType } from "../../../../../types/comment";
import Comment from "./Comment";

function Comments({
  postId,
  entries,
  onLoadMore,
}: {
  postId: string;
  entries: Array<CommentType>;
  onLoadMore: VoidFunction;
}) {
  return (
    <>
      {entries.map((comment: CommentType) => (
        <Comment key={comment.id} comment={comment} postId={postId} />
      ))}
      <ButtonTertiary onClick={onLoadMore}>Load More</ButtonTertiary>
    </>
  );
}

export default Comments;
