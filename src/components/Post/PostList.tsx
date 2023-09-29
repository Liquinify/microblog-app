"use client";

import React, { FC } from "react";
import PostItem from "./PostItem";
import { Posts } from "@/models/Posts";
import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { getPosts } from "@/api/Posts";

type Props = {
  data: Posts;
};

const PostList: FC<Props> = ({ data }) => {
  const { data: postData, isError } = useQuery("posts", getPosts);

  return (
    <Box sx={{ mt: 10 }}>
      {data.user.user_metadata.userType === "Author"
        ? postData
            ?.filter(
              (post: Posts) =>
                post.username === data.user.user_metadata.username
            )
            .map((post: Posts) => (
              <PostItem post={post} key={post.id} data={data} />
            ))
        : postData?.map((post: Posts) => (
            <PostItem post={post} key={post.id} data={data} />
          ))}
      {isError && <p>Failed to fetch posts...</p>}
    </Box>
  );
};

export default PostList;
