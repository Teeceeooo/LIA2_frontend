import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import Participant from "../interfaces/participantInterface";

export default function editParticipant(editedParticipant : Participant) {

  console.log(editedParticipant);

  axios.put("http://localhost:9090/api/v1/participants/edit", editedParticipant)
  .then(response => {
    console.log(response);
  })
  .catch(error => {
    console.log(error);
  });

}
