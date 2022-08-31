import React from "react";
import ButtonTertiary from "../../../../../components/utilities/button/ButtonTertiary";
import { Comment as CommentType } from "../../../../../types/comment";
import { Post } from "../../../../../types/post";
import Comment from "./Comment";

function Comments({
  post,
  entries,
  onLoadMore,
}: {
  post: Post;
  entries: Array<CommentType>;
  onLoadMore: VoidFunction;
}) {
  return (
    <>
      {entries.map((comment: CommentType) => (
        <Comment key={comment.id} comment={comment} post={post} />
      ))}
      <ButtonTertiary onClick={onLoadMore}>Load More</ButtonTertiary>
    </>
  );
}

export default Comments;
