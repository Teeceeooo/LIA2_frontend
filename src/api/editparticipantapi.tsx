import axios from "axios";
import React from "react";
import Participant from "../interfaces/participantInterface";
import { getConfig } from "../interfaces/configInterface";

export default async function editParticipant(
  editedParticipant: Participant,
  image: File | null,
  isImageChanged: boolean
): Promise<void> {
  const baseURL = getConfig().baseURL;
  const frontURL = getConfig().frontBaseURL;

  const username = sessionStorage.getItem('username');
  const password = sessionStorage.getItem('password');

  const formData = new FormData();

  const uploadURL = `${baseURL}/api/v1/images/upload`;
  const editParticipantURL = `${baseURL}/api/v1/participants/edit`;

  try {
    if (image && isImageChanged) {
      formData.append("file", image);
      const response = await axios.post(uploadURL, formData, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          "Content-Type": "multipart/form-data",
        },
      });
      const imageUrl = response.data;
      editedParticipant.image.imageUrl = imageUrl;
    }

    await axios.put(editParticipantURL, editedParticipant, {
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
    });
  } catch (error) {
    console.error(error);
    throw error; 
  }
}
