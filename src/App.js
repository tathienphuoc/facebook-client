import React, { useEffect, useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WelcomePage from "./pages/WelcomePage";
import { UserContext } from "./UserContext";
import { io } from "socket.io-client";
import ProfilePage from "./pages/ProfilePage";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [socket, setSocket] = useState(() => io("http://localhost:3001"));

  const value = useMemo(
    () => ({ user, setUser, socket }),
    [user, setUser, socket]
  );

  useEffect(() => {
    user && setUser(user);
  }, []);

  return (
    <div className="font-Roboto">
      <UserContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
