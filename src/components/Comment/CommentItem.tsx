import { Box, Paper, Typography } from "@mui/material";
import React from "react";

type Props = {};

const CommentItem = ({ comment }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        paddingLeft: "8px",
        borderLeft: "1px solid #ccc",
        marginBottom: "16px",
        ml: 2,
        borderRadius: 0,
        mt: 2,
      }}
    >
      <Box
        sx={{
          marginRight: "16px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1,
        }}
      >
        <img
          src={comment.avatar}
          alt="User Avatar"
          style={{ width: "3%", borderRadius: "50%" }}
        />
        <Typography variant="subtitle1" color="primary">
          {comment.username}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(comment.created_at).toUTCString()}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, mt: 1 }}>
        <Typography variant="body2">{comment.payload}</Typography>
      </Box>
    </Paper>
  );
};

export default CommentItem;
