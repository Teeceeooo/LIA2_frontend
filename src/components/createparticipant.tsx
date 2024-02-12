import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import addParticipant from "../api/postparticipantapi";
import { useParams } from "react-router-dom";

export default function Createparticipant() {
  let { id } = useParams<string>();
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
    <div>
      <input
        type="file"
        accept="image/*"
        capture
        onChange={handleImageUpload}
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
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <div className="add-item-container">
        <TextField
          id="outlined-multiline-flexible"
          label="Lägg till pryl"
          multiline
          maxRows={1}
          value={participantItem}
          onChange={(e) => setParticipantItem(e.target.value)}
        />
        <button className="add-item-btn" onClick={addItem}>
          Lägg till
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
    </div>
  );
}
