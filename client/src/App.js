import {
  BrowserRouter,
  Navigate,
  Routes,
  Router,
  Route,
} from "react-router-dom";
import HomePage from "pages/homePage";
import LoginPage from "pages/loginPage/index.jsx";
import ProfilePage from "pages/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme.js";
import state from "state/index.js";
import Modal from "components/Modal.jsx";
import Chat from "components/Chat.jsx";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />}></Route>
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            ></Route>
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            ></Route>
          </Routes>
          <Chat />
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
