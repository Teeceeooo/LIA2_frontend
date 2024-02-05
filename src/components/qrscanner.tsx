import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import axios from "axios";
import { Outlet, Link } from "react-router-dom";
import Participant from "./participant";
import { Switch } from "@mui/material";
import { Route, useNavigate  } from "react-router-dom";

interface Participant {
  fullName : string,
  image : {
    imageUrl : string
  }
}

export default function QrScanner() {
  let scanner: Html5QrcodeScanner | null = null;
  const [QRresult, setQRresult] = useState<Participant | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!scanner) {
      scanner = new Html5QrcodeScanner(
        "reader",
        {
          qrbox: {
            width: 500,
            height: 500,
          },
          fps: 150,
        },
        false
      );
      scanner.render(success, error);
    }
    
    function success(id : any) {
      axios.get("http://localhost:9090/api/v1/participants/findById/" + id)
      .then((response) => {
        if(response.data === true){
          navigate(`/participant/${id}`, { state: { id: id } });
        } else if (response.data === false){
          console.log("FAAAAAAAAAAAALSSSSSSSSEEEEEEEEEE")
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
          <div id="reader">
          </div>
        </div>
      </>
    );
}
