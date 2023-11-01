"use client";

import React, { experimental_useOptimistic as useOptimistic } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { Comments, Posts } from "@/app/global";

const CommentList = ({
  post,
  commentData,
}: {
  post: Posts;
  commentData: CommentsWithUser[];
}) => {
  return (
    <>
      {commentData
        ?.filter((comment: Comments) => comment.post_id === post.id)
        .map((comment: CommentsWithUser) => (
          <div key={comment.id}>
            <CommentItem comment={comment} key={comment.id} />
          </div>
        ))}
      <CommentForm post={post} />
    </>
  );
};

export default CommentList;
