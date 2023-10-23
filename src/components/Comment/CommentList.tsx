"use client";

import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useQuery } from "react-query";
import { getComments } from "@/api/Comments";

type Props = {};

const CommentList = ({ data, post, commentData }) => {
  return (
    <div>
      {commentData
        ?.filter((comment) => comment.post_id === post.id)
        .map((comment) => (
          <div>
            <CommentItem comment={comment} key={comment.id} />
          </div>
        ))}
      {/* {isError && <p>Couldn't fetch the comments...</p>} */}
      <CommentForm data={data} post={post} />
    </div>
  );
};

export default CommentList;
