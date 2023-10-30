"use client";

import React from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { Posts } from "@/models/Posts";

type Props = {};

const CommentList = ({ post, commentData }) => {
  return (
    <>
      {commentData
        ?.filter((comment) => comment.post_id === post.id)
        .map((comment: Posts) => (
          <div key={comment.id}>
            <CommentItem comment={comment} key={comment.id} />
          </div>
        ))}
      <CommentForm post={post} />
    </>
  );
};

export default CommentList;
