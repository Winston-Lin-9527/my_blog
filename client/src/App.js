import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "pages/homePage";
import LoginPage from "pages/loginPage";
import GuestPage from 'pages/guestPage';
import ProfilePage from "pages/profilePage";
import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";

import { io } from "socket.io-client";

// const socket = io(process.env.REACT_APP_SERVER_URL, {
//   reconnectionDelayMax: 10000,
//   // auth: {
//   //   token: "123"
//   // },
//   // query: {
//   //   "my-key": "my-value"
//   // }
// });

// const socket = socketIO.connect(process.env.REACT_APP_SERVER_URL);

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
            <Route path="/" element={<GuestPage/>} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/admin"
              element={isAuth ? <HomePage /> : <Navigate to="/invalid" replace={true}/>} // don't know why replace needs to be true... documentation says don't need it
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/invalid" replace={true}/>}
            />
            <Route
              path="/invalid"
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
