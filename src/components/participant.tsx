import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { Link, Navigate, Route, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Createparticipant from "./createparticipant";


interface Participant {
  fullName: string;
  telephoneNumber: string;
  comment: string;

  image: {
    imageUrl: string;
  };
  participantItems: [
    {
      id: number;
      description: string;
    }
  ];
}

let userId: number;

export default function Participant() {
  const [user, setUser] = useState<Participant | null>(null);
  let { id } = useParams();
  const navigate = useNavigate();

  

  /* Hämta objektet */
  useEffect(() => {
    getParticipant();
    function getParticipant() {
      axios
        .get("http://localhost:9090/api/v1/participants/" + id)
        .then((response) => {
          setUser(response.data);
          console.log("JA JAG KÖRS")
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
      const response = await axios.get(
        "http://localhost:9090/api/v1/images/img/" + user?.image.imageUrl,
        {
          responseType: "blob",
        }
      );
      const profilePicture = URL.createObjectURL(response.data);
      setProfileImg(profilePicture);
    } catch (error) {
      console.error("Något gick fel: ", error);
    }
  };

  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={profileImage || "default-image.jpg"}
        title="Profile picture"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user?.fullName}
        </Typography>

        <Typography variant="body2" color="text.secondary">
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
            <PhoneAndroidIcon className="phone-icon"/>
          </a>
          <ModeEditIcon className="edit-icon" onClick={editParticipant}/>
        </div>
      </CardActions>
    </Card>
  );

  function editParticipant() {
    console.log(user);
    navigate(`/edituser`, { state: { currentUser : user}});
  }

}
