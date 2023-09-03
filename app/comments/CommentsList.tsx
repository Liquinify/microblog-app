import React, { useEffect, useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useCurrentUser } from "../hooks/currentUser";
import CommentsItem from "./CommentsItem";
import { supabase } from "../utils/supabaseClient";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { fetchComments } from "../utils/api.config";

const CommentsList = () => {
  const { register, handleSubmit, reset } = useForm();
  const { currentUser } = useCurrentUser;
  const [comments, setComments] = useState([]);
  const { data } = useQuery("comment", fetchComments);

  const handleNewComment = async (formData, postId) => {
    const newComment = {
      comments: formData.comment,
    };
    const updatedComments = [newComment];

    const { data, error } = await supabase
      .from("Posts")
      .update(updatedComments)
      .eq("id", postId);
  };

  useEffect(() => {
    fetchComments();
  }, [data]);

  return (
    <div>
      <Typography variant="h6" sx={{ pt: 2 }}>
        Comments
      </Typography>
      {comments.map((comment, idx: number) => (
        <CommentsItem comment={comment} key={idx} />
      ))}
      {currentUser?.user_metadata.userType === "Author" ? (
        ""
      ) : (
        <Box
          sx={{ mt: 5 }}
          component="form"
          onSubmit={handleSubmit(handleNewComment)}
        >
          <TextField
            label="Add a comment"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            {...register("comment")}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "8px" }}
          >
            Add Comment
          </Button>
        </Box>
      )}
    </div>
  );
};

export default CommentsList;
