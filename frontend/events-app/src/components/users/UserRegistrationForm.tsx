import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState, useEffect, FormEventHandler } from "react";
import { useNavigate } from "react-router-dom";

export const UserRegistrationForm = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [age, setAge] = useState("number");
  const [email, setEmail] = useState("");
  const [eventsName, setEventsName] = useState("");
  const [eventsList, setEventsList] = useState([{ name: "", id: "" }]);

  const [isRegistered, setIsRegistered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedEventsData = async () => {
      const response = await fetch("/events", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const eventsList = await response.json();
      setEventsList(eventsList);
    };
    fetchedEventsData();
  }, []);

  const handleEventChange = (event: any) => {
    setEventsName(event.target.value);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    axios.post(
      "/users",
      {
        name,
        surname,
        birthdate,
        age,
        email,
        eventsName,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setIsRegistered(true);
    alert("Registration succsesfull");
    navigate("/users");
  };

  return (
    <>
      <Box>
        <Typography variant="h6" align="center" margin="15px">
          User registration form
        </Typography>

        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

              alignItems: "center",
            }}
          >
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    required
                    name="name"
                    type="text"
                    fullWidth
                    id="name"
                    label="name"
                    autoFocus
                    onChange={(e) => setName(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    type="text"
                    fullWidth
                    id="surname"
                    label="surname"
                    name="surname"
                    autoFocus
                    autoComplete="family-name"
                    onChange={(e) => setSurname(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    InputLabelProps={{ shrink: true }}
                    required
                    fullWidth
                    type="date"
                    label="date"
                    id="birthdate"
                    onChange={(e) => setBirthdate(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="age"
                    label="age"
                    type="number"
                    id="age"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    type="text"
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <InputLabel>Event</InputLabel>
                    <Select
                      value={eventsName}
                      input={<OutlinedInput label="eventName" />}
                      onChange={handleEventChange}
                    >
                      {eventsList.map((event) => (
                        <MenuItem value={event.name} key={event.id}>
                          {event.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Button
                  variant="contained"
                  sx={{
                    background: "#ec407a",
                    marginTop: "15px",
                    marginBottom: "25px",
                    width: "150px",
                    padding: "10px",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                  type="submit"
                >
                  Register
                </Button>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};
