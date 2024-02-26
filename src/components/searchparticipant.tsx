import { Button, List, TextField } from "@mui/material";
import config from "../config.json";
import axios from "axios";
import { useState } from "react";
import Participant from "../interfaces/participantInterface";
import { useNavigate } from "react-router-dom";

export default function SearchParticipant() {
  const navigate = useNavigate();
  const [participantId, setParticipantId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comment, setComment] = useState("");

  function fetchParticipants() {
    if (!(participantId || fullName || phoneNumber || comment)) {
      console.log("Alla fält är tomma, inget händer....");
    } else {
      let searchData = {
        id: participantId || null,
        fullName: fullName || null,
        telephoneNumber: phoneNumber || null,
        comment: comment || null,
        image: {
          imageUrl: "",
        },
        participantItems: [],
      };
      axios
        .post(
          "http://localhost:9090/api/v1/participants/searchusers",
          searchData
        )
        .then((response) => {
          console.log(response.data);
        });
    }
  }
  function navigateToParticipantPage(id: string) {
    navigate(`/participant/${id}`);
  }

  function testFunc() {
    console.log("ID: ", participantId);
    console.log("fullName: ", fullName);
    console.log("phoneNumber: ", phoneNumber);
    console.log("comment: ", comment);
  }

  return (
    <>
      <div className="search-participant-container">
        <h2 className="search-participant-container">Sök efter participant</h2>
        <TextField
          id="outlined-multiline-flexible"
          label="ID"
          multiline
          maxRows={1}
          onChange={(e) => setParticipantId(e.target.value)}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Fullständigt namn"
          multiline
          maxRows={1}
          onChange={(e) => setFullName(e.target.value)}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Telefonnummer"
          multiline
          maxRows={1}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Kommentar"
          multiline
          maxRows={4}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button variant="outlined" size="medium" onClick={fetchParticipants}>
          Sök
        </Button>
      </div>

      <button onClick={testFunc}>TEST</button>
    </>
  );
}
