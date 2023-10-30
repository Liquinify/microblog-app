"use client";

import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const CommentForm = ({ post }) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const createCommentMutation = useMutation(
    async (formData: FieldValues) => {
      const supabase = createClientComponentClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase.from("comments").insert({
          payload: formData.payload,
          post_id: post.id,
          user_id: user.id,
        });
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
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <TextField
          margin="normal"
          multiline
          variant="outlined"
          label="Post your reply"
          id="post"
          {...register("payload", { required: true, maxLength: 100 })}
          sx={{
            display: "flex",
            margin: "auto",
            mt: 5,
            marginInline: 2,
            borderColor: "#495057",
          }}
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
          Reply
        </Button>
      </Box>
    </>
  );
};

export default CommentForm;
