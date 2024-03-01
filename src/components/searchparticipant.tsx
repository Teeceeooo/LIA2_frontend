import { Button, List, TextField } from "@mui/material";
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

  const [searchResult, setSearchResult] = useState<Participant[]>([]);

  async function fetchParticipants() {
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
          setSearchResult(response.data);
        });
    }
  }
  function navigateToParticipantPage(id: string) {
    navigate(`/participant/${id}`);
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
      <ul className="search-result-container">
        {searchResult.length > 0 &&
          searchResult.map((participant, index) => (
            <li
              key={index}
              onClick={() => navigateToParticipantPage(participant.id)}
            >
              {participant.fullName} | {participant.id}
            </li>
          ))}
      </ul>
    </>
  );
}
