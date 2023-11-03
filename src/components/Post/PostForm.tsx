"use client";

import React from "react";
import { supabase } from "@/lib/client";
import { Box, Button, TextField } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

const PostForm = ({ userData }: { userData: PostsWithUser }) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  const createPostMutation = useMutation(
    async (formData: FieldValues) => {
      const { error } = await supabase
        .from("posts")
        .insert({
          post: formData.post,
          user_id: userData.user.id,
        })
        .single();
      if (error) {
        console.log(error);
      }
    },

    {
      onSuccess: () => {
        queryClient.invalidateQueries("posts");
        reset();
      },
    }
  );

  const onSubmit: SubmitHandler<FieldValues> = (formData) => {
    createPostMutation.mutate(formData);
  };

  return (
    <>
      {userData.user === null ? null : (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            margin="normal"
            multiline
            label="What are you up to?"
            id="post"
            {...register("post", { required: true })}
            sx={{
              display: "flex",
              width: "40rem",
              margin: "auto",
              mt: 5,
              background: "transparent",
              borderColor: "#495057",
              borderRadius: "20px",
            }}
            inputProps={{
              style: {
                height: "6rem",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              position: "relative",
              left: "63%",
              mt: 2,
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Post
          </Button>
        </Box>
      )}
    </>
  );
};

export default PostForm;
