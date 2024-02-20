import axios from "axios";
import React from "react";
import Participant from "../interfaces/participantInterface";

export default function editParticipant(
  editedParticipant: Participant,
  image: File | null,
  isImageChanged: boolean
) {
  const formData = new FormData();
 
  if (image && isImageChanged) {
    formData.append("file", image);
    axios
      .post("http://localhost:9090/api/v1/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("------->" + editedParticipant.fullName)
        const imageUrl = response.data;
        editedParticipant.image.imageUrl = imageUrl;
        axios
          .post(
            "http://localhost:9090/api/v1/participants/add",
            editedParticipant
          )
          .then((response) => {
            /* Navigera här direkt till QR scannern igen */
          })
          .catch((error) => {
            console.error(error);
            console.log("1")
          });
      })
      .catch((error) => {
        console.error(error);
        console.log("2")
      });
  } else {
    axios
      .post("http://localhost:9090/api/v1/participants/add", editedParticipant)
      .then(() => {
        /* Navigera här direkt till QR scannern igen */
      })
      .catch((error) => {
        console.error(error);
        console.log("2")
      });
  }
}
