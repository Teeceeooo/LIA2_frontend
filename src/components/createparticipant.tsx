import { Button, TextField } from "@mui/material";
import React, { useState } from "react";

export default function Createparticipant() {
  const [currentParticipantItems, setCurrentParticipantItems] = useState<
    string[]
  >([]);
  const [participantItem, setParticipantItem] = useState<string | null>("");

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

  function addParticipant() {
    /* Denna ska flyttas till egen fil.. */
    interface Participant {
      fullName: string;
      telephoneNumber: string;

      image: {
        imageUrl: string;
      };
      participantItems: [
        {
          //id: number;
          description: string;
        }
      ];
    }

    /* Fylla upp detta objekt med den information som finns för att sedan göra en POST. */
    let newParticipant: Participant = {
      fullName: "",
      telephoneNumber: "",

      image: {
        imageUrl: "",
      },
      participantItems: [
        {
          //id: number;
          description: "",
        },
      ],
    };
  }

  return (
    <div>
      <input type="file" accept="image/*" capture />
      <TextField
        id="outlined-multiline-flexible"
        label="Fullständigt namn"
        multiline
        maxRows={1}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Telefonnummer"
        multiline
        maxRows={1}
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
      <Button variant="outlined" size="medium" onClick={addParticipant}>
        Skapa
      </Button>
    </div>
  );
}
