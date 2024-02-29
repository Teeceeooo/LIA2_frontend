import React from "react";
import "./App.css";
import PersistentDrawerLeft from "./components/mainmenu";
import QrScanner from "./components/qrscanner";
import Participant from "./components/participant";
import Footer from "./components/footer";
import Layout from "./components/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PartyModeOutlined } from "@mui/icons-material";
import Createparticipant from "./components/createparticipant";

function App() {
  return (
    <>
    <BrowserRouter>
      <div className="App">
        <PersistentDrawerLeft />
          <Routes>
            <Route path="/" element={<QrScanner />} />
            <Route path="/participant/:id" element={<Participant />} /> 
            <Route
              path="/createparticipant/:id"
              element={<Createparticipant />}
            />
            <Route
              path="/edituser"
              element={<Createparticipant />}
            />
          </Routes>
          <Layout />
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
