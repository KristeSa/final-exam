import React, { useState } from "react";
import axios from "axios";
import type { RegisterFormState } from "./types";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const Register: React.FC = () => {
  const [state, setState] = useState<RegisterFormState>({
    email: "",
    password: "",
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleRegisterForm = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5100/auth/register",
        state
      );
      if (response.status === 200) {
        alert("Registration succsesfull");
        window.location.href = "/login";
      }
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <Box component="form" margin="30px" onSubmit={handleRegisterForm}>
      <Grid item xs={12}>
        <TextField
          required
          sx={{ margin: "10px", width: "350px" }}
          type="email"
          name="email"
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
      >
        Register
      </Button>

      <Typography
        aria-label="event description"
        marginTop="10px"
        padding="10px"
        fontWeight="300"
        color="#ec407a"
      >
        Already have account?
      </Typography>
      <Link style={{ textDecoration: "none" }} color="#ec407a" to="/login">
        Login
      </Link>
    </Box>
  );
};
