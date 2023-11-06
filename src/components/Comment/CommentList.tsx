"use client";

import React from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { Comments, Posts } from "@/app/global";

const CommentList = ({
  post,
  commentData,
}: {
  post: PostsWithUser;
  commentData: CommentsWithUser[] | undefined;
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
