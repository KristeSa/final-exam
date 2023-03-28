import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();

    navigate("/login");
  };

  return (
    <Box margin="10px" justifyContent="center">
      <Typography variant="h5" paddingBottom="20px">
        EVENTS SITE
      </Typography>
      {localStorage.token && (
        <Button sx={{ color: "#ec407a", mr: "15px" }} href="/events">
          Events
        </Button>
      )}

      {localStorage.token && (
        <Button sx={{ color: "#ec407a", mr: "15px" }} href="/users">
          Users
        </Button>
      )}

      {localStorage.token && (
        <Button
          onClick={handleLogout}
          sx={{ color: "#ec407a", mr: "15px" }}
          href="/Logout"
        >
          Logout
        </Button>
      )}
      {localStorage.token && (
        <Button
          variant="contained"
          sx={{ background: "#ec407a", ml: "25px" }}
          href="/registration"
        >
          Register user
        </Button>
      )}
    </Box>
  );
};
