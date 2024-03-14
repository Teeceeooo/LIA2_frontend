import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PersistentDrawerLeft from "./components/mainmenu";
import QrScanner from "./components/qrscanner";
import Participant from "./components/participant";
import Layout from "./components/layout";
import { PartyModeOutlined } from "@mui/icons-material";
import Createparticipant from "./components/createparticipant";
import Logview from "./components/logview";
import SearchParticipant from "./components/searchparticipant";
import Login from "./components/login";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <div className="App">
        
        <PersistentDrawerLeft />
        <Routes>
          {!isLoggedIn && <Route path="/" element={<Login onLogin={handleLogin} />} />}
          {isLoggedIn && (
            <>
              <Route path="/" element={<QrScanner />} />
              <Route path="/participant/:id" element={<Participant />} />
              <Route path="/createparticipant/:id" element={<Createparticipant />} />
              <Route path="/edituser" element={<Createparticipant />} />
              <Route path="/logs/:id" element={<Logview />} />
              <Route path="/searchuser" element={<SearchParticipant />} />
            </>
          )}
          {isLoggedIn && <Route path="/login" element={<Navigate to="/" />} />}
        </Routes>
        <Layout />
      </div>
    </BrowserRouter>
  );
}

export default App;