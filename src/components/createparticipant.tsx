import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import addParticipant from "../api/postparticipantapi";
import editParticipant from "../api/editparticipantapi";
import { useLocation, useParams } from "react-router-dom";

export default function Createparticipant() {
  interface Participant {
    fullName: string;
    telephoneNumber: string;
    comment: string;

    image: {
      imageUrl: string;
    };
    participantItems: [
      {
        id: number;
        description: string;
      }
    ];
  }

  let { id } = useParams<string>();
  let { state } = useLocation();

  useEffect(() => {
    /* Fyll datan i useStates? */
  }, [state]);

  const [currentParticipantItems, setCurrentParticipantItems] = useState<
    string[]
  >([]);
  const [participantItem, setParticipantItem] = useState<string | null>("");
  const [fullName, setFullName] = useState<string | null>("");
  const [phoneNumber, setPhoneNumber] = useState<string | null>("");
  const [comment, setComment] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  function addItem() {
    if (participantItem !== null && participantItem.trim() !== "") {
      setCurrentParticipantItems((prevItems) => [
        ...prevItems,
        participantItem,
      ]);
      setParticipantItem("");
    }
  }

  function removeItem(itemIndex: number) {
    setCurrentParticipantItems((prevItems) =>
      prevItems.filter((item, index) => index !== itemIndex)
    );
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  }

  return (
    <div className="container-create-participant">
      <TextField
        defaultValue="ID FINNS"
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
      <div id="add-to-list-container">
        <TextField
          id="outlined-multiline-flexible"
          label="Lägg till pryl"
          multiline
          maxRows={1}
          onChange={(e) => setParticipantItem(e.target.value)}
        />
        <button className="add-item-btn" onClick={addItem}>
          +
        </button>
      </div>

      <ul
        className="participant-list-post"
        style={{
          display: currentParticipantItems.length === 0 ? "none" : "block",
        }}
      >
        {currentParticipantItems.map((item: string, index: number) => (
          <li className="list-item-post" key={index}>
            {item}
            <button className="remove-btn" onClick={() => removeItem(index)}>
              X
            </button>
          </li>
        ))}
      </ul>
      {window.location.href.includes("createparticipant") && (
        <Button
          variant="outlined"
          size="medium"
          onClick={() =>
            addParticipant(
              fullName,
              phoneNumber,
              comment,
              imageFile,
              currentParticipantItems,
              id || "0"
            )
          }
        >
          Skapa
        </Button>
      )}

      {window.location.href.includes("edituser") && (
        <Button
          variant="outlined"
          size="medium"
          onClick={() =>
            editParticipant(
              fullName,
              phoneNumber,
              comment,
              imageFile,
              currentParticipantItems,
              id || "0"
            )
          }
        >
          Redigera
        </Button>
      )}
    </div>
  );
}
