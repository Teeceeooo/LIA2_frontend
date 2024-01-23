import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function QrScanner() {
  const [QRresult, setQRresult] = useState<Student | null>(null);
  let scanner: Html5QrcodeScanner | null = null;
  const getStudentById = "http://localhost:8080/student/student/";
 

  let testStudent : Student = {
    fullName : ''
  }

  interface Student {
    fullName : string;
  }


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

    function success(result : any) {
      axios.get(getStudentById + result).then((response) => {
          console.log(response);
      });

      
      /*
        if (scanner) {
          scanner.clear();
        }
      */  
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
