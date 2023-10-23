"use client";

import { supabase } from "@/lib/client";
import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type Props = {};

const CommentForm = ({ data, post }) => {
  const { register, handleSubmit, reset } = useForm();

  const createComment: SubmitHandler<FieldValues> = async (formData) => {
    const { error } = await supabase.from("comments").insert({
      payload: formData.comment,
      username: data.user.user_metadata.username,
      avatar: data.user.user_metadata.avatar,
      post_id: post.id,
    });
    if (!error) {
      reset();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(createComment)}>
      <TextField
        margin="normal"
        multiline
        label="What do you think?"
        id="post"
        {...register("comment", { required: true, maxLength: 100 })}
        sx={{ display: "flex", margin: "auto", mt: 5, marginInline: 2 }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          mt: 2,
          backgroundColor: "blue",
          color: "white",
          ml: 2,
          mb: 2,
        }}
      >
        Post
      </Button>
    </Box>
  );
};

export default CommentForm;
