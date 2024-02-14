import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import addParticipant from "../api/postparticipantapi";
import editParticipant from "../api/editparticipantapi";
import { useLocation, useParams } from "react-router-dom";
import Participant from "../interfaces/participantInterface";
import Item from "../interfaces/itemInterface";

export default function Createparticipant() {


  let { id } = useParams<string>();

  const isEdit = window.location.pathname.includes("edituser");

  
  let { state } = useLocation();
  const currentUser = state.currentUser;


  useEffect(() => {
   if(state =! null){
   /* setEditUserId(state.currentUser.id)*/
   console.log(state);
  } 
  
  }, [state]);

  const [currentParticipantItems, setCurrentParticipantItems] = useState<
    Item[]
  >(currentUser ? currentUser.participantItems : []);

  const [participantItem, setParticipantItem] = useState<string>();

  const [fullName, setFullName] = useState<string>(
    currentUser ? currentUser.fullName : ""
  );

  const [phoneNumber, setPhoneNumber] = useState<string>(currentUser ? currentUser.telephoneNumber : "");
  const [editUserId, setEditUserId] = useState<string>(currentUser ? currentUser.id : "");

  const [comment, setComment] = useState<string>(currentUser ? currentUser.comment : "");
  const [imageUrl, setImageUrl] = useState<string>(currentUser ? currentUser.image.imageUrl : "default-image.png");
  const [imageFile, setImageFile] = useState<File | null>(currentUser ? currentUser.image : null);

  function addItem() {
    console.log(currentParticipantItems);
    const testItem : Item = {
      id : undefined,
      description: participantItem, 
      Participant: currentUser ? currentUser : null
    }
    setCurrentParticipantItems([...currentParticipantItems, testItem]);
  }

  function removeItem(itemIndex: number) {
    const deleteedItem = currentParticipantItems.filter((item, index) => index !== itemIndex)
    setCurrentParticipantItems(deleteedItem);
    console.log('clicked remove', itemIndex)
  }

  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;
    if (files && files.length > 0) {
      setImageFile(files[0]);
    }
  }

  function testFunc(description : string) {
    setParticipantItem(description);
  }



  return (
    <div className="container-create-participant">
      <input type="file" name="avatar" accept="image/png, image/jpeg" onChange={handleImageUpload}/>
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



{isEdit && participantItem ? (
  <ul
        className="participant-list-post"
        style={{
          display: currentUser.participantItems.length === 0 ? "none" : "block",
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
          onClick={() =>{
            const editedParticipant: Participant = {
              id : editUserId,
              fullName: fullName,
              telephoneNumber: phoneNumber,
              image : {
                imageUrl : imageUrl,
              },
              comment: comment,
              participantItems: currentParticipantItems,
          }
          editParticipant(editedParticipant);
        }
          }>
          Redigera
        </Button>
      ) : (
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
    </div>
  );
}
