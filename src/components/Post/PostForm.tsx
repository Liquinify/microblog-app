"use client";

import React, { FC, useEffect } from "react";
import { supabase } from "@/lib/client";
import { Posts } from "@/models/Posts";
import { Box, Button, TextField } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  userData: Posts;
};

const PostForm: FC<Props> = ({ userData }) => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log(userData);
  }, []);

  const createPostMutation = useMutation(
    async (formData: FieldValues) => {
      const { error } = await supabase
        .from("posts")
        .upsert({
          post: formData.post,
          username: userData.user.user_metadata.username,
          avatar: userData.user.user_metadata.avatar,
        })
        .single();
      if (error) {
        throw new Error("Failed to create a post");
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
            {...register("post", { required: true, maxLength: 100 })}
            sx={{ display: "flex", width: "50rem", margin: "auto", mt: 5 }}
            inputProps={{
              style: {
                height: "100px",
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ ml: 157, mt: 2, backgroundColor: "blue", color: "white" }}
          >
            Post
          </Button>
        </Box>
      )}
    </>
  );
};

export default PostForm;
