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
