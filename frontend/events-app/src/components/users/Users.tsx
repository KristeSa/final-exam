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
import { TUser } from "./types";

export const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<TUser[]>([]);

  const removeUser = (id: number) => {
    axios
      .delete(`/users/${id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() =>
        setUsers(
          users.filter((user) => {
            return user.id !== id;
          })
        )
      )
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    axios
      .get("/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

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
            Users
          </Typography>
          <Table
            sx={{ minWidth: 650, ml: "20px", mr: "20px" }}
            aria-label="user table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Surname</TableCell>
                <TableCell align="left">Birthdate</TableCell>
                <TableCell align="center">Age</TableCell>
                <TableCell align="left">Email</TableCell>
                <TableCell align="left">Event name</TableCell>
                <TableCell align="left">Delete user</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((user) => (
                <TableRow
                  key={user.id}
                  className="user-container"
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="left">{user.surname}</TableCell>
                  <TableCell align="center">
                    {user.birthdate.toString().slice(0, 10)}
                  </TableCell>
                  <TableCell align="center">{user.age}</TableCell>
                  <TableCell align="left">{user.email}</TableCell>
                  <TableCell align="left">{user.eventsName}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      sx={{
                        background: "#ec407a",
                        width: "80px",
                        padding: "5px",
                      }}
                      onClick={() => {
                        removeUser(user.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
