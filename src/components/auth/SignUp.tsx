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

const SignUp = () => {
  const supabase = createClientComponentClient();
  const [error, setError] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();

  const defaultAvatar =
    "https://lesuezlfeulhjswwbyks.supabase.co/storage/v1/object/public/avatars/User-avatar.svg.png";

  const signUp: SubmitHandler<FieldValues> = async (formData) => {
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          username: formData.username,
          avatar_url: defaultAvatar,
        },
      },
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
          width: "40rem",
          height: "28rem",
          paddingInline: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          Create an account
        </Typography>
        <Box component="form" onSubmit={handleSubmit(signUp)} sx={{ mt: 1 }}>
          <TextField
            error={error === true}
            margin="normal"
            required
            fullWidth
            label="Username"
            {...register("username")}
          />
          <TextField
            error={error === true}
            margin="normal"
            required
            fullWidth
            label="Email Address"
            {...register("email")}
          />
          <TextField
            error={error === true}
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            {...register("password")}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Submit
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/sign-up">Have an account? Sign In</Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignUp;
