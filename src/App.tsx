import React from "react";
import "./App.css";
import PersistentDrawerLeft from "./components/mainmenu";
import QrScanner from "./components/qrscanner";
import Participant from "./components/participant";
import Footer from "./components/footer";
import Layout from "./components/layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PartyModeOutlined } from "@mui/icons-material";


function App() {
  return (
    <>

    <div className="App">
      <PersistentDrawerLeft />
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<QrScanner />}>
        <Route index element={<QrScanner />} />
      </Route>
      <Route path="/participant" element={<Participant />}>
        <Route index element={<Participant />} />
      </Route>
    </Routes>
    <Layout />
  </BrowserRouter>
      
    </div>
    </>
  );
}

export default App;
