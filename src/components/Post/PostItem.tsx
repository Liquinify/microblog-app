"use client";

import { Posts } from "@/models/Posts";
import { Box, Card, CardContent, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import React, { FC, useState } from "react";
import CommentsList from "../comment/CommentList";
import { useQuery } from "react-query";
import { getPosts } from "@/api/getPosts";
import { getComments } from "@/api/getComments";

type Props = {
  post: Posts;
};

const PostItem: FC<Props> = ({ post, userData }) => {
  const [dropdown, setDropdown] = useState(false);
  const { data: commentData, isError } = useQuery(["comments"], getComments);

  const commentLength = commentData?.filter(
    (comment) => comment.post_id === post.id
  ).length;

  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 800,
        margin: "16px auto",
        minHeight: "10rem",
      }}
    >
      <CardContent sx={{ mt: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <img
            src={post.avatar}
            alt="User Avatar"
            style={{ width: "5%", borderRadius: "50%" }}
          />
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {post.username}
          </Typography>
          *
          <Typography variant="body1">
            {new Date(post.created_at).toUTCString()}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {post.post}
        </Typography>
      </CardContent>
      <Box
        sx={{
          ml: 2,
          border: "none",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          mt: 0.5,
          gap: 1,
          background: "none",
        }}
        onClick={() => setDropdown(!dropdown)}
        component="button"
      >
        <CommentIcon
          sx={{
            color: "black",
            width: 20,
          }}
        />
        {commentLength}
      </Box>
      {dropdown && (
        <CommentsList
          commentData={commentData}
          userData={userData}
          post={post}
        />
      )}
    </Card>
  );
};

export default PostItem;
