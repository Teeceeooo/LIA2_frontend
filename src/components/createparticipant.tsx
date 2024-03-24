import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import addParticipant from "../api/postparticipantapi";
import editParticipant from "../api/editparticipantapi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Participant from "../interfaces/participantInterface";
import Item from "../interfaces/itemInterface";

export default function Createparticipant() {
  let { id } = useParams<string>();

  const navigate = useNavigate();

  const isEdit = window.location.pathname.includes("edituser");

  let { state } = useLocation();
  const currentUser = state.currentUser;

  const [currentParticipantItems, setCurrentParticipantItems] = useState<
    Item[]
  >(currentUser ? currentUser.participantItems : []);

  const [participantItem, setParticipantItem] = useState<string>();

  const [fullName, setFullName] = useState<string>(
    currentUser ? currentUser.fullName : ""
  );

  const [phoneNumber, setPhoneNumber] = useState<string>(
    currentUser ? currentUser.telephoneNumber : ""
  );
  const [editUserId, setEditUserId] = useState<string>(
    currentUser ? currentUser.id : ""
  );

  const [comment, setComment] = useState<string>(
    currentUser ? currentUser.comment : ""
  );
  const [imageUrl, setImageUrl] = useState<string>(
    currentUser ? currentUser.image.imageUrl : "default-image.png"
  );
  const [imageFile, setImageFile] = useState<File | null>(
    currentUser ? currentUser.image : null
  );

  const [imageIsChanged, setImageIsChanged] = useState<boolean>(false);

  function addItem() {
    const tempItem: Item = {
      description: participantItem,
    };
    const updatedItems = [...currentParticipantItems, tempItem];
    setCurrentParticipantItems(updatedItems);
    setParticipantItem("");
    if (currentUser) {
      currentUser.participantItems = updatedItems;
    }
  }

  function removeItem(itemIndex: number) {
    const updatedItems = currentParticipantItems.filter(
      (item, index) => index !== itemIndex
    );
    setCurrentParticipantItems(updatedItems);
    if (currentUser) {
      currentUser.participantItems = updatedItems;
    }
  }

  async function handleEditParticipant() {
    const editedParticipant: Participant = {
      id: editUserId,
      fullName: fullName,
      telephoneNumber: phoneNumber,
      image: {
        imageUrl: imageUrl,
      },
      comment: comment,
      participantItems: currentUser.participantItems,
    };

    await editParticipant(editedParticipant, imageFile, imageIsChanged);
    navigate("/participant/" + editUserId);
  }

  function handleAddParticipant() {
    addParticipant(
      fullName,
      phoneNumber,
      comment,
      imageFile,
      currentParticipantItems,
      id || "0"
    );
    navigate("/");
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
      setImageIsChanged(true);
    }
  }

  return (
    <div className="container-create-participant">
      <input
        title=" asd"
        type="file"
        name="avatar"
        className="image-button"
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
      />
      <h3 className="h3-default">Id: {currentUser ? currentUser.id : id}</h3>
      <TextField
        value={fullName}
        id="outlined-multiline-flexible"
        label="Fullständigt namn"
        multiline
        maxRows={1}
        onChange={(e) => setFullName(e.target.value)}
      />
      <TextField
        value={phoneNumber}
        id="outlined-multiline-flexible"
        label="Telefonnummer"
        multiline
        maxRows={1}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <TextField
        value={comment}
        id="outlined-multiline-flexible"
        label="Kommentar"
        multiline
        maxRows={4}
        onChange={(e) => setComment(e.target.value)}
      />
      <div id="add-to-list-container">
        <TextField
          value={participantItem}
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

      {isEdit && currentUser.participantItems ? (
        <ul
          className="participant-list-post"
          style={{
            display:
              currentUser.participantItems.length === 0 ? "none" : "block",
          }}
        >
          {currentUser.participantItems.map((item: Item, index: number) => (
            <li className="list-item-post" key={item?.id}>
              {item.description}
              <button className="remove-btn" onClick={() => removeItem(index)}>
                X
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <ul
          className="participant-list-post"
          style={{
            display: currentParticipantItems.length === 0 ? "none" : "block",
          }}
        >
          {currentParticipantItems.map((item: Item, index: number) => (
            <li className="list-item-post" key={item.id}>
              {item.description}
              <button className="remove-btn" onClick={() => removeItem(index)}>
                X
              </button>
            </li>
          ))}
        </ul>
      )}

      {isEdit ? (
        <Button
          variant="outlined"
          size="medium"
          onClick={() => {
            handleEditParticipant();
          }}
        >
          Spara
        </Button>
      ) : (
        <Button
          variant="outlined"
          size="medium"
          onClick={() => handleAddParticipant()}
        >
          Skapa
        </Button>
      )}
    </div>
  );
}
