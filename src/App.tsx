import React from "react";
import "./App.css";
import PersistentDrawerLeft from "./components/mainmenu";
import QrScanner from "./components/qrscanner";
import Participant from "./components/participant";
import Layout from "./components/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Createparticipant from "./components/createparticipant";
import Logview from "./components/logview";
import SearchParticipant from "./components/searchparticipant";


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
            <Route path="/edituser" element={<Createparticipant />} />
            <Route path="/logs/:id" element={<Logview />} />
            <Route
              path="/edituser"
              element={<Createparticipant />}
            />
           <Route
              path="/searchuser"
              element={<SearchParticipant />}
            />
          </Routes>
          <Layout /> 
      </div>
    </BrowserRouter>

    </>
  );
}

export default App;
