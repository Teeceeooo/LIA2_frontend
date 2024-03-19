import { Button, TextField } from "@mui/material";
import { registerUser } from "../api/userAPI";
import { useState } from "react";
import { CheckBox } from "@mui/icons-material";

export default function Registeruser() {
  const [username, setUserName] = useState("");
  const [userpassword, setUserPassword] = useState("");
  const [isActivated, setIsActiviated] = useState(false);

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
          registerUser(username, userpassword, isActivated);
        }}
      >
        Registrera användare
      </Button>
    </div>
  );
}
