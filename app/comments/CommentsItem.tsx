import { List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { FC } from "react";
import { Comments } from "../models/comments";

type Props = {
  comment: Comments;
};

const CommentsItem: FC<Props> = ({ comment }) => {
  return (
    <List disablePadding>
      <ListItem>
        <div
          style={{
            borderLeft: "3px solid #ccc",
            paddingLeft: "8px",
            paddingRight: "16px",
          }}
        >
          <Typography variant="body2" color="textSecondary">
            {comment.comment}
          </Typography>
        </div>
      </ListItem>
    </List>
  );
};

export default CommentsItem;
