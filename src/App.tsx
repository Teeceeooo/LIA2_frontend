import React from "react";
import "./App.css";
import PersistentDrawerLeft from "./components/mainmenu";
import QrScanner from "./components/qrscanner";
//import Testing from "./components/testing";

function App() {
  return (
    <div className="App">
      <PersistentDrawerLeft />
    </div>
  );
}

export default App;
