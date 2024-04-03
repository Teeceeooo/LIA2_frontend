import { getConfig } from "../interfaces/configInterface";
import axios from "axios";
import userInterface from "../interfaces/userInterface";



export default function fetchModerators() {
    const username = sessionStorage.getItem("username");
    const password = sessionStorage.getItem("password");
    const token = sessionStorage.getItem("token");
    

    const baseURL = `${getConfig().baseURL}`;
  

    axios
      .get(`${baseURL}/api/v1/user/getAll`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
      .then((response) => {
      })
      .catch((error) => {
        if (error.response) {
          console.log("Det gick inte hämta moderatorerna");
        } else {
          console.error(error);
        }
      });
  

}