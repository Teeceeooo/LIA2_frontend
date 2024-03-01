import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { Config, config } from './interfaces/configInterface';




async function fetchConfig() {
  return await axios
  .get("/config.json")
  .then((response) => {
   return response.data;
  })
 }
 export default fetchConfig;

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

 fetchConfig().then((c) => config.c = c).then(() => {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
 }
 );

reportWebVitals();
