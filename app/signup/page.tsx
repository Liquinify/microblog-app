"use client";

import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/app/utils/supabaseClient";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const router = useRouter();

  const handleFormSubmit = async (formData) => {
    const { username, password, email, userType } = formData;

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          username: username,
          userType: userType,
        },
      },
    });
    console.log(data);
    router.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box
          component="form"
          sx={{ mt: 1 }}
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <TextField
            margin="normal"
            fullWidth
            label="Username"
            autoComplete="name"
            autoFocus
            {...register("username")}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Email"
            {...register("email")}
          />
          <TextField
            margin="normal"
            fullWidth
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            {...register("password")}
          />
          <TextField
            sx={{ mt: 2 }}
            fullWidth
            label="Select your user type"
            select
            SelectProps={{ style: { minWidth: "200px" } }}
            {...register("userType")}
          >
            <MenuItem value="Author">Author</MenuItem>
            <MenuItem value="Commentator">Commentator</MenuItem>
          </TextField>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
