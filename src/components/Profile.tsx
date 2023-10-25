"use client";

import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Profile = ({ data }) => {
  const { register } = useForm();

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
    >
      <Box
        component="img"
        src={data.user.user_metadata.avatar}
        sx={{
          width: "40%",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
        }}
      />
      <Input
        type="file"
        inputProps={{
          accept: "image/*",
        }}
        {...register("image")}
      />
      <Typography variant="caption">Email</Typography>
      <TextField margin="normal" {...register("username", { maxLength: 30 })} />
      <Typography variant="caption">Username</Typography>
      <TextField margin="normal" {...register("email", { maxLength: 30 })} />
      <Button variant="contained" sx={{ mt: 3 }} type="submit">
        Update
      </Button>
    </Box>
  );
};

export default Profile;
