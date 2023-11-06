"use client";

import React from "react";
import PostItem from "./PostItem";
import { Box } from "@mui/material";
import { useQuery } from "react-query";
import { getPosts } from "@/api/getPosts";

const PostList = ({ userData }: { userData: any }) => {
  const { data: postData, isError } = useQuery("posts", getPosts);

  const posts =
    postData?.map((post) => ({
      ...post,
      user_has_liked_post: !!post.likes.find(
        (like: PostsWithUser) => like.user_id === userData.user?.id ?? null
      ),
      likes: post.likes.length,
    })) ?? [];

  return (
    <Box sx={{ mt: 10 }}>
      {posts?.map((post) => (
        <PostItem post={post} key={post.id} />
      ))}
      {isError && <p>Failed to fetch posts...</p>}
    </Box>
  );
};

export default PostList;
