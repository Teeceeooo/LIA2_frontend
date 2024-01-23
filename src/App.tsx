import React from "react";
import "./App.css";
import PersistentDrawerLeft from "./components/mainmenu";
import QrScanner from "./components/qrscanner";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <PersistentDrawerLeft />
      <QrScanner />
      <Footer />
    </div>
  );
}

export default App;
