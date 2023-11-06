"use client";

import React from "react";
import { Box, Button, TextField } from "@mui/material";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { getUser } from "@/api/getUser";
import { supabase } from "@/lib/client";
import { useQuery } from "react-query";

const Profile = () => {
  const { register, handleSubmit } = useForm();
  const { data } = useQuery("user", getUser);

  // const updateProfile: SubmitHandler<FieldValues> = async (formData) => {
  //   const { error } = await supabase.from("profiles").upsert({
  //     id: data.id,
  //     username: formData.username,
  //   });
  //   console.log(data);
  // };

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
      // onSubmit={handleSubmit(updateProfile)}
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
