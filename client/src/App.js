import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "pages/homePage";
import LoginPage from "pages/loginPage";
import GuestPage from 'pages/guestPage';
import ProfilePage from "pages/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

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
            <Route path="/" element={<GuestPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={isAuth ? <HomePage /> : <Navigate to="/404" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/404" />}
            />
            <Route
              path="/404"
              element={<>You don't have permission to access this page, login through homepage</>}
            />
            <Route
              path="*"
              // element={<Navigate to="/home" replace />} /> 
              element={<>You seem to have wandered to a no man land.</>}
            />
              {/* `replace` replaces the current URL in history stack, so going back doesn't work */}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
