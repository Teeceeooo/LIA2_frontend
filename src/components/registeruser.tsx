import { Button, TextField } from "@mui/material";
import { registerUser } from "../api/userAPI";
import { useState } from "react";

export default function Registeruser() {
  const [username, setUserName] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [isActivated, setIsActiviated] = useState(false);
  const [nameOfUser, setNameOfUser] = useState("");

  return (
    <div className="register-user-container">
      <h2>Registrera ny användare</h2>
      <TextField
        id="outlined-multiline-flexible"
        label="Användarnamn"
        multiline
        maxRows={1}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        id="outlined-multiline-flexible"
        label="Lösenord"
        multiline
        maxRows={1}
        onChange={(e) => setUserPassword(e.target.value)}
      />
         <TextField
        id="outlined-multiline-flexible"
        label="Namn"
        multiline
        maxRows={1}
        onChange={(e) => setNameOfUser(e.target.value)}
      />
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
          registerUser(username, userpassword, isActivated, nameOfUser);
        }}
      >
        Registrera användare
      </Button>
    </div>
  );
}
