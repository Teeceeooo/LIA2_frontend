import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import Item from "../interfaces/itemInterface";

export default function addParticipant(
  fullName: string | null,
  phoneNumber: string | null,
  comment: string | null,
  imageFile: File | null,
  currentParticipantItems: Item[],
  qrid: string
) {
  const qridNumber = qrid ? parseInt(qrid, 10) : undefined;
  const participantItemsArray = currentParticipantItems.map((item: Item) => ({
    description: item.description,
  }));

  let participantData = {
    id: qridNumber,
    fullName: fullName,
    telephoneNumber: phoneNumber,
    comment: comment,
    participantItems: participantItemsArray,
    image: {
      id: 0,
      imageUrl: "default-image.png",
    },
  };
  console.log(participantData);
  const formData = new FormData();
  if (imageFile) {
    formData.append("file", imageFile);

    axios
      .post("http://localhost:9090/api/v1/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const imageUrl = response.data;

        participantData = {
          id: qridNumber,
          fullName: fullName,
          telephoneNumber: phoneNumber,
          comment: comment,
          participantItems: participantItemsArray,
          image: {
            id: 0,
            imageUrl: imageUrl,
          },
        };
        axios
          .post(
            "http://localhost:9090/api/v1/participants/add",
            participantData
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
      .post("http://localhost:9090/api/v1/participants/add", participantData)
      .then(() => {
        /* Navigera här direkt till QR scannern igen */
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
