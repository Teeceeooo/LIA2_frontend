import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function QrScanner() {
  const [QRresult, setQRresult] = useState(null);
  let scanner: Html5QrcodeScanner | null = null;

  useEffect(() => {
    if (!scanner) {
      scanner = new Html5QrcodeScanner(
        "reader",
        {
          qrbox: {
            width: 300,
            height: 300,
          },
          fps: 1,
        },
        false
      );
      scanner.render(success, error);
    }

    function success(result: any) {
      setQRresult(result);

      /* Lättare att testa om denna inte ligger här nu
        if (scanner) {
          scanner.clear();
        }
      */
    }

    function error(err: any) {
      console.warn(err);
    }
  }, []);

  useEffect(() => {
    console.log("Värdet ändrades!");
    console.log(QRresult + " <<");
  }, [QRresult]);

  return (
    <>
      <div className="qr-container">
        <h1>{QRresult}</h1>
        <div id="reader"></div>
      </div>
    </>
  );
}
