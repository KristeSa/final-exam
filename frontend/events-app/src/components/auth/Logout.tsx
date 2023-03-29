import { Typography } from "@mui/material";
import { Login } from "./Login";

export const Logout = () => {
  return (
    <>
      <Typography variant="h5" pt="30px">
        You have logged out succesfully
      </Typography>
      <Login />
    </>
  );
};
