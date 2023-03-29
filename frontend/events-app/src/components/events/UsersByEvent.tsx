import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { TUser } from "../users/types";

export const UsersByEvent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<TUser[]>([]);
  const [searchEventsNameParams, _] = useSearchParams();

  useEffect(() => {
    {
      axios
        .get(`/events/${searchEventsNameParams}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => setUsers(response.data))
        .catch((error) => console.log(error))
        .finally(() => setIsLoading(false));
    }
  }, [searchEventsNameParams]);

  return (
    <>
      {isLoading ? (
        <Typography
          component="h1"
          variant="h5"
          padding={2}
          role="loading-message"
        >
          Loading
        </Typography>
      ) : (
        <TableContainer role="users-container" component={Paper}>
          <Typography component="h1" variant="h4" py="40px" pb="40px">
            Atendees
          </Typography>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Surname</TableCell>
                <TableCell align="left">Birthdate</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Event</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} className="user-container">
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="left">{user.surname}</TableCell>
                  <TableCell align="left">
                    {user.birthdate.toString().slice(0, 10)}
                  </TableCell>
                  <TableCell align="center">{user.age}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.eventsName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
