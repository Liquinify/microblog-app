"use client";

import React from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

type Props = {};

const CommentList = ({ userData, post, commentData }) => {
  return (
    <div>
      {commentData
        ?.filter((comment) => comment.post_id === post.id)
        .map((comment) => (
          <div key={comment.id}>
            <CommentItem comment={comment} key={comment.id} />
          </div>
        ))}
      {/* {isError && <p>Couldn't fetch the comments...</p>} */}
      <CommentForm data={userData} post={post} />
    </div>
  );
};

export default CommentList;
