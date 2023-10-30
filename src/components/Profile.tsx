"use client";

import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

const Profile = () => {
  const { register, handleSubmit } = useForm();

  const updateProfile: SubmitHandler<FieldValues> = async (formData) => {
    const supabase = createClientComponentClient();
    const { data } = await supabase.auth.getUser();
    const { error } = await supabase.from("profiles").upsert({
      username: formData.username,
      id: data.user?.id,
    });
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        width: "40%",
        mt: 15,
      }}
      onSubmit={handleSubmit(updateProfile)}
    >
      <TextField
        label="Username"
        margin="normal"
        {...register("username", { maxLength: 30 })}
      />
      <Button variant="contained" sx={{ mt: 3 }} type="submit">
        Update
      </Button>
    </Box>
  );
};

export default Profile;
