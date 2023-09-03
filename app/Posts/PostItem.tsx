import { Grid, Paper, Typography } from "@mui/material";
import React, { FC } from "react";
import CommentsList from "../comments/CommentsList";
import { Posts } from "../models/posts";

type Props = {
  post: Posts;
};

const PostItem: FC<Props> = ({ post }) => {
  return (
    <div style={{ padding: 14 }}>
      <Paper style={{ padding: "40px 20px" }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid justifyContent="left" item xs zeroMinWidth>
            <Typography variant="h4" style={{ margin: 0, textAlign: "left" }}>
              {post.username}
            </Typography>
            <Typography variant="h5" sx={{ pt: 2 }}>
              {post.title}
            </Typography>
            <Typography sx={{ pt: 2 }}>{post.description}</Typography>
          </Grid>
        </Grid>
        <CommentsList />
      </Paper>
    </div>
  );
};

export default PostItem;
