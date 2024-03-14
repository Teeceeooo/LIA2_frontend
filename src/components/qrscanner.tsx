import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getConfig } from "../interfaces/configInterface";

export default function QrScanner() {
  let scanner: Html5QrcodeScanner | null = null;
  const navigate = useNavigate();
  const showParticipantURL = `${getConfig().baseURL}/api/v1/participants/findById/`;

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
      const username = sessionStorage.getItem('username');
      const password = sessionStorage.getItem('password');
      // test console log för debugging. Ta bort vid deployment
      if (!username || !password) {
        console.error('Username or password not found in sessionStorage');
        return;
      }

      axios
        .get(showParticipantURL + id, {
          headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`
          }
        })
        .then((response) => {
          if (response.data === true) {
            console.log("TRUE");
            navigate(`/participant/${id}`, { state: { id: id } });
          } else if (response.data === false) {
            console.log("FALSE");
            navigate(`/createparticipant/${id}`, { state: { id: id } });
          }
        })
        .catch((error) => {
          console.error("An error occurred while fetching participant data: ", error);
        });
    }

    function error(err: any) {
      //console.warn(err);
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
