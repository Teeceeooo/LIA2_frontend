import axios from "axios";
import React from "react";
import Participant from "../interfaces/participantInterface";
import config from "../config.json";

export default function editParticipant(
  editedParticipant: Participant,
  image: File | null,
  isImageChanged: boolean
) {
  const formData = new FormData();
  const uploadURL = `${config.baseURL}/api/v1/images/upload`;
  const addURL = `${config.baseURL}/api/v1/participants/add`;
  const showParticipantURL = `${config.frontBaseURL}/participant/`;
  const editParticipantURL = `${config.baseURL}/api/v1/participants/edit`;

  if (image && isImageChanged) {
    formData.append("file", image);
    axios
      .post(uploadURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        const imageUrl = response.data;
        editedParticipant.image.imageUrl = imageUrl;
        axios
          .put(editParticipantURL, editedParticipant)
          .then(() => {
            window.location.href = `${showParticipantURL}${editedParticipant.id}`;

          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    axios
      .put(editParticipantURL, editedParticipant)
      .then(() => {
        window.location.href = `${showParticipantURL}${editedParticipant.id}`;
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
