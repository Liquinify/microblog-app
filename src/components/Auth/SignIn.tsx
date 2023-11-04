"use client";

import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { SubmitHandler, FieldValues } from "react-hook-form";

const SignIn = () => {
  const supabase = createClientComponentClient();
  const [error, setError] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  const signIn: SubmitHandler<FieldValues> = async (formData) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) {
      setError(true);
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ mt: 30, ml: 75 }}>
      <Paper
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "37rem",
          height: "25rem",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(signIn)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            error={error === true}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoFocus
            {...register("email")}
          />
          <TextField
            error={error === true}
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            {...register("password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/reset-password">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link href="/sign-up">Don't have an account? Sign Up</Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignIn;
