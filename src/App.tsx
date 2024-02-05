import React from "react";
import "./App.css";
import PersistentDrawerLeft from "./components/mainmenu";
import QrScanner from "./components/qrscanner";
import Participant from "./components/participant";
import Footer from "./components/footer";
import Layout from "./components/layout";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PartyModeOutlined } from "@mui/icons-material";

const router = createBrowserRouter([
  {
    path: '/',
    element: <QrScanner />
  },
  {
    path: '/participant/:id',
    element: <Participant />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
