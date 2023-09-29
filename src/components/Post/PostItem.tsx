"use client";

import { Posts } from "@/models/Posts";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import React, { FC, useState } from "react";
import CommentsList from "../Comment/CommentList";

type Props = {
  post: Posts;
};

const PostItem: FC<Props> = ({ post, data }) => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <Card
      variant="outlined"
      sx={{
        maxWidth: 800,
        margin: "16px auto",
        minHeight: "8rem",
      }}
    >
      <CardContent sx={{ mt: 1 }}>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {post.username}
          </Typography>
          <Typography variant="body1">
            {new Date(post.created_at).toUTCString()}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ mt: 2 }}>
          {post.post}
        </Typography>
      </CardContent>
      <Box
        sx={{ ml: 5, width: 5, height: 2, border: "none", cursor: "pointer" }}
        onClick={() => setDropdown(!dropdown)}
        component="button"
      >
        <CommentIcon
          sx={{
            ml: -4,
            color: "black",
            width: 20,
            "&:hover": { color: "none" },
          }}
        />
      </Box>
      {dropdown && <CommentsList data={data} post={post} />}
    </Card>
  );
};

export default PostItem;
