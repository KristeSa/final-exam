import React, { useState } from "react";
import axios from "axios";
import type { LoginFormState } from "./types";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

export const Login: React.FC = () => {
  const [user, setUser] = useState<LoginFormState | null>(null);

  const [state, setState] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await axios.post("/auth/login", state).then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setUser(user);
        alert("Login successful");

        navigate("/events");
      });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <Box
      component="form"
      margin="30px"
      onSubmit={handleLogin}
      aria-label="handle-login"
    >
      <Grid item xs={12}>
        <TextField
          required
          sx={{ margin: "10px", width: "350px" }}
          type="email"
          name="email"
          aria-label="email"
          label="email"
          value={state.email}
          onChange={handleInputChange}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          required
          sx={{ margin: "10px", width: "350px" }}
          type="password"
          name="password"
          aria-label="password"
          label="password"
          value={state.password}
          onChange={handleInputChange}
        />
      </Grid>

      <Button
        variant="contained"
        sx={{
          background: "#ec407a",
          marginTop: "15px",
          width: "150px",
          padding: "10px",
        }}
        type="submit"
        name="Login"
        role="login button"
      >
        Login
      </Button>

      <Typography
        aria-label="event description"
        marginTop="10px"
        padding="10px"
        fontWeight="300"
        color="#ec407a"
      >
        Don't have account?
      </Typography>
      <Link style={{ textDecoration: "none" }} color="#ec407a" to="/register">
        Register
      </Link>
    </Box>
  );
};
