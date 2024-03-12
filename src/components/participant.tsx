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
  const [asd, setAsd] = useState<string>("");

  const showParticipantURL = `${baseURL}/api/v1/participants/`;
  const imgURL = `${baseURL}/api/v1/images/img/`;

  useEffect(() => {
    console.log("Denna körs, varför uppdateras inte denna komponent...?");
  }, [asd]);

  const handleCheckIn = async () => {
    if (idParam) {
      await checkInParticipant(idParam);
      setAsd("fghhfghgffhg!");
    } else {
      console.log("IdParam är tomt.");
    }
  };

  const handleCheckOut = async () => {
    if (idParam) {
      await checkOutParticipant(idParam);
      setAsd("fdgfdgfdggfdfdggfdfdg!");
    } else {
      console.log("IdParam är tomt.");
    }
  };

  const handleLeaving = async () => {
    if (idParam) {
      await leavingParticipant(idParam);
      setAsd("dfgdfgfdgfdg!");
    } else {
      console.log("IdParam är tomt.");
    }
  };

  const handleReturning = async () => {
    if (idParam) {
      await returningParticipant(idParam);
      setAsd("sdffsdsdf!");
    } else {
      console.log("IdParam är tomt.");
    }
  };

  useEffect(() => {
    getParticipant();
    function getParticipant() {
      axios.get(showParticipantURL + idParam).then((response) => {
        setUser(response.data);
      });
    }
  }, []);

  useEffect(() => {
    checkCurrentParticipantStatus();
    function checkCurrentParticipantStatus() {
      axios
        .get(`http://localhost:9090/api/v1/activity/getLatest/${idParam}`)
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
  }, []);

  useEffect(() => {
    if (user) {
      fetchImage();
    }
  }, [user]);

  const [profileImage, setProfileImg] = useState<string | undefined>(undefined);

  const fetchImage = async () => {
    setProfileImg(undefined);
    try {
      const response = await axios.get(imgURL + user?.image.imageUrl, {
        responseType: "blob",
      });
      const profilePicture = URL.createObjectURL(response.data);
      setProfileImg(profilePicture);
    } catch (error) {
      console.error("Något gick fel: ", error);
    }
  };

  function navigateToLog() {
    if (user && user.id) {
      navigate(`/logs/${user.id}`);
    } else {
      console.log("Något gick fel");
    }
  }

  return (
    <>
      <Card sx={{ maxWidth: 500 }} className="participant-new-container">
        <CardMedia
          sx={{ height: 140 }}
          image={profileImage || "default-image.jpg"}
          title="Profile picture"
          component="a"
          href={profileImage || "default-image.jpg"}
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
      <div>
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
            <button onClick={handleCheckOut}>Checka ut</button>
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
