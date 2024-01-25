import React from "react";
import "./App.css";
import PersistentDrawerLeft from "./components/mainmenu";
import QrScanner from "./components/qrscanner";
import Participant from "./components/participant";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <PersistentDrawerLeft />
      <Participant />
    </div>
  );
}

export default App;
