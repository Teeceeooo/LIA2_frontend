import axios from "axios";
import React, { useEffect } from "react";
import Item from "../interfaces/itemInterface";
import { getConfig } from "../interfaces/configInterface";


export default function addParticipant(
  fullName: string | null,
  phoneNumber: string | null,
  comment: string | null,
  imageFile: File | null,
  currentParticipantItems: Item[],
  qrid: string
) {

  const baseURL = getConfig().baseURL;
  const frontURL = getConfig().frontBaseURL;

  
  
  const addURL = `${baseURL}/api/v1/participants/add`;
  const uploadURL = `${baseURL}/api/v1/images/upload`;
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
      .post(uploadURL, formData, {
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
          .post(addURL, participantData)
          .then((response) => {
           
            console.log(response.data);
          })
          .then(() => {
            window.location.href = `${frontURL}`;
          
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
      .post(addURL, participantData)
      .then(() => {
        window.location.href = `${frontURL}`;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
}
