import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

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

  /* Hämta objektet */
  useEffect(() => {
    getParticipant();
    function getParticipant() {
      axios
        .get("http://localhost:9090/api/v1/participants/" + id)
        .then((response) => {
          setUser(response.data);
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
      <CardActions>
        {/* Objektets telefonnummer */}
        <a href={"tel:" + user?.telephoneNumber}>
          <PhoneAndroidIcon />
        </a>
      </CardActions>
    </Card>
  );
}
