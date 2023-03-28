import { useContext } from "react";
import "./App.css";
import { AuthContext } from "./components/auth/AuthContext";
import { MainRouter } from "./components/mainRouter/MainRouter";

export const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <div className="App">
      <AuthContext.Provider value={{ token }}>
        <MainRouter />
      </AuthContext.Provider>
    </div>
  );
};
