import { Box, Grid, Typography } from "@mui/material";
import { FC } from "react";
import { TEvent } from "./types";

export const Event: FC<TEvent> = (event) => {
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
      <Box
        display="flex"
        margin="10px"
        width="150px"
        height="300px"
        justifyContent="center"
        alignItems="center"
        aria-label="event image"
        sx={{
          "& img": { objectFit: "cover", width: "100%", maxHeight: "100%" },
        }}
      >
        <img src={event.img} role="img" width="150px" />
      </Box>

      <Box height="50px" overflow="clip">
        <Typography aria-label="event name">{event.name}</Typography>
        <Typography aria-label="event date">{event.date}</Typography>
        <Typography aria-label="event description">
          {event.Description}
        </Typography>
      </Box>
    </Grid>
  );
};
