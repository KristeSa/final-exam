import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IAuthContext } from "./types";

export const AuthContext = createContext<IAuthContext>({ token: undefined });

export const AuthProvider = ({ children }: any) => {
  const [token, setToken] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    console.log(token);

    if (!accessToken) {
      navigate("/login");
    } else {
      setToken(accessToken);
    }
  }, [token]);

  if (!token) return null;

  return (
    <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
  );
};
