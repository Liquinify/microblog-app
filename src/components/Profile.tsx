"use client";

import { Box, Button, Input, TextField, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Profile = ({ userData }) => {
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
      {/* <img src={userData.user_metadata.avatar} alt="Profile" /> */}
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
      <Button type="submit">Update</Button>
    </Box>
  );
};

export default Profile;
