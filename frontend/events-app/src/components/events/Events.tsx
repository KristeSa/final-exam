import { Box, Button, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { createSearchParams, Link } from "react-router-dom";
import type { TEvent } from "./types";

export const Events = () => {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/events", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setEvents(response.data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading ? (
        <Typography
          component="p"
          variant="h5"
          padding={2}
          role="loading-message"
        >
          Loading
        </Typography>
      ) : (
        <Grid
          aria-label="events list"
          container
          justifyContent="center"
          sx={{
            backgroundColor: "#f5f5f5",
          }}
        >
          <Box py="40px">
            <Typography component="h1" variant="h4" pb="60px">
              Events
            </Typography>
            <Grid
              container
              spacing="30px"
              justifyContent="center"
              aria-label="events-container"
            >
              {events.map((event) => (
                <Grid
                  key={event.id}
                  item
                  md={4}
                  aria-label="event-container"
                  justifyContent="center"
                  alignItems="center"
                  margin="10px"
                  padding="15px"
                  boxShadow="0px 0px 8px 1px rgba(0, 0, 0, 0.1)"
                  borderRadius="5px"
                >
                  <Grid item xs={12}>
                    <Typography
                      aria-label="event name"
                      variant="h5"
                      color="#ec407a"
                      textAlign="center"
                      padding="10px"
                    >
                      {event.name}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      aria-label="event date"
                      padding="10px"
                      fontWeight="500"
                    >
                      Date: {event.date.toString().slice(0, 10)}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      aria-label="event description"
                      padding="10px"
                      fontWeight="300"
                    >
                      {event.Description}
                    </Typography>
                  </Grid>

                  <Link
                    to={{
                      pathname: "/events/eventsName",
                      search: `?${createSearchParams(
                        `${event.name}`.replace("=", "")
                      )}`,
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        background: "#ec407a",
                        marginTop: "15px",
                        width: "150px",
                        padding: "5px",
                      }}
                    >
                      Show atendees
                    </Button>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      )}
    </>
  );
};
