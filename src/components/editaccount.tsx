import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { editUserAccount } from "../api/editaccountAPI";
import { useLocation } from "react-router-dom";
import { getConfig } from "../interfaces/configInterface";

import axios from "axios";
import User from "../interfaces/userInterface";

export default function Editaccount() {
  const { state } = useLocation();
  const { userNameToFetch } = state;
  const userCredentials = sessionStorage.getItem("username");
  const passwordCredentials = sessionStorage.getItem("password");
  // const [username, setUserName] = useState(userNameToFetch ? userNameToFetch : "");
  const [userpassword, setUserPassword] = useState("");
  const [isActivated, setIsActiviated] = useState(
    userNameToFetch.isActivated ? userNameToFetch.isActivated : false
  );
  const [nameOfUser, setNameOfUser] = useState<string | "">("");
  const [user, setUser] = useState<User | null>(null);

  const baseURL = `${getConfig().baseURL}`;

  useEffect(() => {
    axios
      .get(`${baseURL}/api/v1/user/${userNameToFetch}`, {
        headers: {
          Authorization: `Basic ${btoa(`mkag:password`)}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log("Det gick inte hämta moderatorerna");
        } else {
          console.error(error);
        }
      });
  }, []);

  return (
    <div className="edit-account-container">
      <h1>Redigerar: {userNameToFetch}</h1>
      <TextField
        id="outlined-multiline-flexible"
        label="Lösenord"
        multiline
        maxRows={1}
        onChange={(e) => setUserPassword(e.target.value)}
      />
      {/* Utkommenterar denna tills vi vet om name ska användas överhuvudtaget.
      <TextField
        value={nameOfUser}
        id="outlined-multiline-flexible"
        label="Namn"
        multiline
        maxRows={1}
        onChange={(e) => setNameOfUser(e.target.value)}
      />*/}
      <div>
        <input
          className="checkbox-reg"
          type="checkbox"
          id="enabled"
          name="enabled"
          onChange={(e) => setIsActiviated(e.target.checked)}
        />
        <label className="checkbox-label" htmlFor="enabled">
          Aktivera användare?
        </label>
      </div>
      <Button
        variant="outlined"
        size="medium"
        onClick={() => {
          editUserAccount(
            userNameToFetch,
            userpassword,
            isActivated,
            nameOfUser
          );
        }}
      >
        Redigera Moderator
      </Button>
    </div>
  );
}
