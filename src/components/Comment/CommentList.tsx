"use client";

import React, { useEffect, useState } from "react";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useQuery } from "react-query";
import { getComments } from "@/api/Comments";

type Props = {};

const CommentList = ({ data, post }) => {
  const [comments, setComments] = useState([]);
  const { data: commentData, isError } = useQuery(["comments"], getComments);

  return (
    <div>
      {commentData
        ?.filter((comment) => comment.post_id === post.id)
        .map((comment) => (
          <CommentItem comment={comment} key={comment.id} />
        ))}
      {isError && <p>Couldn't fetch the comments...</p>}
      <CommentForm data={data} post={post} />
    </div>
  );
};

export default CommentList;
