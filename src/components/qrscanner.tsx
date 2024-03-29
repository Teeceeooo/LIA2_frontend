import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getConfig } from "../interfaces/configInterface";

export default function QrScanner() {
  let scanner: Html5QrcodeScanner | null = null;
  const navigate = useNavigate();
  const showParticipantURL = `${getConfig().baseURL}/api/v1/participants/findById/`;
  const validateToken = `${getConfig().baseURL}/api/v1/token/validate`;

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
      const token = sessionStorage.getItem("token");
    
      if (!token) {
        console.error('Token not found in sessionStorage');
        return;
      }
    
      // Får 401 på denna pga det förväntas username och password. Får 200 i Postman när jag gör POST på endpointet, sätter in token som header och basic auth username och password
      axios.post(validateToken, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        axios.get(showParticipantURL + id, {
          headers: {
            Authorization: `Bearer ${token}`
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
      })
      .catch((error) => {
        console.error("Token validation failed: ", error);
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
