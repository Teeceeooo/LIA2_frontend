import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { getConfig } from "../interfaces/configInterface";
import User from "../interfaces/userInterface";
import { useNavigate } from "react-router-dom";

export default function Searchmoderator() {
  const [accountName, setAccountName] = useState("");
  const [name, setName] = useState("");
  const [allModerators, setAllModerators] = useState<User[]>([]);
  const baseURL = `${getConfig().baseURL}`;
  const token = sessionStorage.getItem("token");
  
  const navigate = useNavigate();

  async function navgiateToModerator(accountUserName: string) {
    navigate("/editaccount", { state: { userNameToFetch: accountUserName } });
  }

  function fetchModerators() {
    let searchData = {
      accountName: accountName || null,
      name: name || null,
    };
    axios
      .post(`${baseURL}/api/v1/user/searchmoderator`, searchData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setAllModerators(response.data);
      });
  }
  return (
    <>
      <div className="search-participant-container">
        <h2 className="search-participant-container">Sök efter Moderator</h2>
        <TextField
          id="outlined-multiline-flexible"
          label="Användarnamn"
          multiline
          maxRows={1}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Namn"
          multiline
          maxRows={1}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          variant="outlined"
          size="medium"
          className="search-btn"
          onClick={fetchModerators}
        >
          Sök
        </Button>
      </div>

      <ul className="search-result-container">
        {allModerators.length > 0 &&
          allModerators.map((user, index) => (
            <li key={index} onClick={() => navgiateToModerator(user.username)}>
              {user.username}
            </li>
          ))}
      </ul>
    </>
  );
}
