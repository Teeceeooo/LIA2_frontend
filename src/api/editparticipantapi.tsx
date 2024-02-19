import axios from "axios";
import React from "react";
import Participant from "../interfaces/participantInterface";

export default function editParticipant(
  editedParticipant: Participant,
  image: File | null
) {
  const formData = new FormData();
  if (image) {
    formData.append("file", image);
    axios
      .post("http://localhost:9090/api/v1/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
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
          });
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    axios
      .post("http://localhost:9090/api/v1/participants/add", editedParticipant)
      .then(() => {
        /* Navigera här direkt till QR scannern igen */
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
