/* eslint-disable react-hooks/exhaustive-deps */
import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "../config.json";

export default function QrScanner() {
  let scanner: Html5QrcodeScanner | null = null;
  const navigate = useNavigate();
  const participantByIdURL = `${config.baseURL}/api/v1/participants/findById/`;

  useEffect(() => {
    if (!scanner) {
      scanner = new Html5QrcodeScanner(
        "reader",
        {
          qrbox: {
            width: 300,
            height: 300,
          },
          fps: 150,
        },
        false
      );
      scanner.render(success, error);
    }

    function success(id: string) {
      scanner?.clear();
      axios
        .get(participantByIdURL + id)
        .then((response) => {
          if (response.data === true) {
            navigate(`/participant/${id}`, { state: { id: id } });
          } else if (response.data === false) {
            navigate(`/createparticipant/${id}`, { state: { id: id } });
          }
        });
    }

    function error(err: any) {
      console.warn(err);
    }
    
  }, []);
  return (
    <>
      <div className="qr-container">
        <div id="reader"></div>
      </div>
    </>
  );
}
