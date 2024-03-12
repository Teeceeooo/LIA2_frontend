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
import { getConfig } from "../interfaces/configInterface";

interface Participant {
  id: string;
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
  const baseURL = `${getConfig().baseURL}`;

  const showParticipantURL = `${baseURL}/api/v1/participants/`;
  const imgURL = `${baseURL}/api/v1/images/img/`;

  

  
  useEffect(() => {
    getParticipant();
    
    async function getParticipant() {
      try {
        const username = sessionStorage.getItem('username');
        const password = sessionStorage.getItem('password');
        if (!username || !password) {
          throw new Error('Username or password not found in sessionStorage');
        }
  
        const response = await axios.get(
          showParticipantURL + id,
          {
            headers: {
              Authorization: `Basic ${btoa(`${username}:${password}`)}`
            }
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("An error occurred while fetching participant data: ", error);
      }
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
      const username = sessionStorage.getItem('username');
      const password = sessionStorage.getItem('password');
      if (!username || !password) {
        throw new Error('Username or password not found in sessionStorage');
      }
  
      const response = await axios.get(
        imgURL + user?.image.imageUrl,
        {
          responseType: "blob",
          headers: {
            Authorization: `Basic ${btoa(`${username}:${password}`)}`
          }
        }
      );
      const profilePicture = URL.createObjectURL(response.data);
      setProfileImg(profilePicture);
    } catch (error) {
      console.error("An error occurred: ", error);
    }
  };
  

  return (
    <Card sx={{ maxWidth: 500 }} className="participant-new-container">
      <CardMedia
        sx={{ height: 140 }}
        image={profileImage || "default-image.png"}
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

        <Typography variant="body2" color="text.secondary" className="comment-text">
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
    console.log(user?.id)
  }

}
