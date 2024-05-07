import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getConfig } from "../interfaces/configInterface";
import ParticipantInterface from "../interfaces/participantInterface";
import {
  checkInParticipant,
  checkOutParticipant,
  leavingParticipant,
  returningParticipant,
} from "../api/activitiyAPI";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import Log from "../interfaces/logInterface";

const username = sessionStorage.getItem("username");
const password = sessionStorage.getItem("password");

export default function Participant() {
  const [user, setUser] = useState<ParticipantInterface | null>(null);
  let { id: idParam } = useParams();
  const navigate = useNavigate();
  const baseURL = `${getConfig().baseURL}`;
  const [latestLog, setLatestLog] = useState<Log | null>({
    id: -1,
    typeOfActivity: "CHECKED_OUT",
    timeOfActivity: "1970-01-01",
  });

  const showParticipantURL = `${baseURL}/api/v1/participants/`;
  const imgURL = `${baseURL}/api/v1/images/img/`;
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    getParticipant();
  }, []);

  function getParticipant() {
    axios
      .get(showParticipantURL + idParam, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((response) => {
        setUser(response.data);
      });
  }

  function checkCurrentParticipantStatus() {
    axios
      .get(`${baseURL}/api/v1/activity/getLatest/${idParam}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((response) => {
        setLatestLog(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log("Det finns inga logs för denna användare...");
        } else {
          console.error(error);
        }
      });
  }

  function navigateToLog() {
    if (user && user.id) {
      navigate(`/logs/${user.id}`);
    } else {
      console.log("Något gick fel");
    }
  }

  async function handleCheckIn() {
    if (idParam) {
      await checkInParticipant(idParam);
      checkCurrentParticipantStatus();
    } else {
      console.log("Det gick inte att lägga till log");
    }
  }

  async function handleCheckOut() {
    if (idParam) {
      await checkOutParticipant(idParam);
      checkCurrentParticipantStatus();
    } else {
      console.log("Det gick inte att lägga till log");
    }
  }

  async function handleLeaving() {
    if (idParam) {
      await leavingParticipant(idParam);
      checkCurrentParticipantStatus();
    } else {
      console.log("Det gick inte att lägga till log");
    }
  }

  async function handleReturning() {
    if (idParam) {
      await returningParticipant(idParam);
      checkCurrentParticipantStatus();
    } else {
      console.log("Det gick inte att lägga till log");
    }
  }

  return (
    <>
      <Card sx={{ maxWidth: 500 }} className="participant-new-container">
        <CardMedia
          sx={{ height: 140 }}
          image={
            user?.image && user?.image.imageUrl
              ? imgURL + user?.image.imageUrl
              : imgURL + "default.jpg"
        }
          title="Profile picture"
          component="a"
          href={
            user?.image.imageUrl
              ? imgURL + user?.image.imageUrl
              : imgURL + "default.jpg"
          }
          target="_blank"
          className="profile-image-container"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {user?.fullName} | {user?.id}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            className="comment-text"
          >
            {user?.comment}
          </Typography>

          <ul className="participant-list">
            {user?.participantItems.map((u) => (
              <li key={u.id}>{u.description}</li>
            ))}
          </ul>
        </CardContent>
        <CardActions className="card-actions-element">
          <div className="icon-container">
            <a href={"tel:" + user?.telephoneNumber}>
              <PhoneAndroidIcon className="phone-icon" />
            </a>
            <ModeEditIcon className="edit-icon" onClick={editParticipant} />
            <MenuBookIcon className="edit-icon" onClick={navigateToLog} />
          </div>
        </CardActions>
      </Card>
      <div className="btns-for-logs">
        {latestLog?.typeOfActivity === "CHECKED_IN" && (
          <>
            <button onClick={handleCheckOut}>CHECKA UT</button>
            <button onClick={handleLeaving}>Lämnar byggnaden</button>
          </>
        )}
        {latestLog?.typeOfActivity === "CHECKED_OUT" && (
          <button onClick={handleCheckIn}>Checka in</button>
        )}
        {latestLog?.typeOfActivity === "LEFT_THE_BUILDING" && (
          <>
            <button onClick={handleReturning}>Går in i byggnaden</button>
          </>
        )}
        {latestLog?.typeOfActivity === "ENTERED_THE_BUILDING" && (
          <>
            <button onClick={handleCheckOut}>CHECKA UT</button>
            <button onClick={handleLeaving}>Lämnar byggnaden</button>
          </>
        )}
      </div>
    </>
  );

  function editParticipant() {
    navigate(`/edituser`, { state: { currentUser: user } });
  }
}
