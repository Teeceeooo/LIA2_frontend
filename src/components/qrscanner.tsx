import { Html5QrcodeScanner } from "html5-qrcode";
import { useState, useEffect } from "react";
import axios from "axios";



export default function QrScanner() {
  let scanner: Html5QrcodeScanner | null = null;
  const [QRresult, setQRresult] = useState<Participant | null>(null);



  interface Participant {
    fullName : string,
    image : {
      imageUrl : string
    }
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
          fps: 15,
        },
        false
      );
      scanner.render(success, error);
    }
    
    function success(result : any) {
      axios.get("http://localhost:9090/api/v1/participants/" + result)
      .then((response) => {
        if (response.data) {
          setQRresult(response.data as Participant);
          scanner?.clear();  
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 500) {
          console.log("Participant med ID: " + result + " hittades inte i databasen");
        } else {
          console.error(error);
        }
      });
     

      /* Lättare utan denna under utveckling
        if (scanner) {
          scanner.clear();
        }
      */  
    }

    

    function error(err: any) {
      console.warn(err);
    } 
  }, []);

  /* När QRresult faktiskt uppdateras vill jag kalla på fetchImage för att säkerställa att datan är där när anropet ska göras */
  useEffect(() => {
    if (QRresult) {
      fetchImage();
    }
  }, [QRresult]);


 
  const [profileImage, setProfileImg] = useState<string | undefined>(undefined);
  const fetchImage = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/v1/images/img/" + QRresult?.image.imageUrl, {
        responseType : 'blob',
      });
      const profilePicture = URL.createObjectURL(response.data);
      setProfileImg(profilePicture);
      console.log("PROFILE PICTURE:  " + profilePicture)
    } catch (error) {
      console.error('Något gick fel: ', error);
    }
  }
    return (
      <>
        <div className="qr-container">
          <div id="reader">
          </div>
          {QRresult?.fullName}
          <div className="profile-picture">
            {profileImage && <img src={profileImage} alt="Profil bild" />}
          </div>
        </div>
      </>
    );
}
