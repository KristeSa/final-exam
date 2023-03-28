import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Footer } from "../footer/Footer";
import { Header } from "../header/Header";
import { Login, Logout, Register, AuthContext } from "../auth";
import { Users, UserRegistrationForm } from "../users";
import { Events, UsersByEvent } from "../events";
import { NoPageFound } from "../noPageFound/NoPageFound";
import { ProtectedRoute } from "./ProtectedRoute";

export const MainRouter = () => {
  const { token } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/registration"
          element={
            <ProtectedRoute token={token}>
              <UserRegistrationForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events"
          element={
            <ProtectedRoute token={token}>
              <Events />
            </ProtectedRoute>
          }
        />
        <Route
          path="/events/:eventsName"
          element={
            <ProtectedRoute token={token}>
              <UsersByEvent />
            </ProtectedRoute>
          }
        />

        <Route path="/logout" element={<Logout />} />

        <Route
          path="/users"
          element={
            <ProtectedRoute token={token}>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoPageFound />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};
