"use client";

import React, { FC } from "react";
import { supabase } from "@/lib/client";
import { Posts } from "@/models/Posts";
import { Box, Button, TextField } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  post: Posts;
  userData: Posts;
};

const CommentForm: FC<Props> = ({ userData, post }) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation(
    async (formData: FieldValues) => {
      const { error } = await supabase
        .from("comments")
        .upsert({
          payload: formData.payload,
          username: userData.user.user_metadata.username,
          avatar: userData.user.user_metadata.avatar,
          post_id: post.id,
        })
        .single();
      if (error) {
        throw new Error("Failed to create a comment");
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("comments");
        reset();
      },
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    createCommentMutation.mutate(formData);
  };

  return (
    <>
      {userData === undefined ? null : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            multiline
            label="What do you think?"
            id="post"
            {...register("payload", { required: true, maxLength: 100 })}
            sx={{ display: "flex", margin: "auto", mt: 5, marginInline: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              background: "blue",
              color: "white",
              ml: 2,
              mb: 2,
            }}
          >
            Post
          </Button>
        </Box>
      )}
    </>
  );
};

export default CommentForm;
