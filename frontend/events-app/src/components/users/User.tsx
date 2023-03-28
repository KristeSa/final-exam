import { Box, Grid, Typography } from "@mui/material";
import { FC } from "react";

import { TUserProps } from "./types";

export const User: FC<TUserProps> = ({ user }) => {
  return (
    <Grid
      item
      xs={6}
      sm={3}
      padding="20px"
      boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.1)"
      borderRadius="5px"
      textAlign="center"
      aria-label="product"
    >
      <Box height="50px" overflow="clip">
        <Typography aria-label="user name">{user.name}</Typography>
        <Typography aria-label="user name">{user.surname}</Typography>
        <Typography aria-label="user birtdate">{user.birthdate}</Typography>
        <Typography aria-label="user age">{user.age}</Typography>
        <Typography aria-label="user email">{user.email}</Typography>
      </Box>
    </Grid>
  );
};
