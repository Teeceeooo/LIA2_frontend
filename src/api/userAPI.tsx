import axios from "axios";
import { getConfig } from "../interfaces/configInterface";
import User from "../interfaces/userInterface";

const username = sessionStorage.getItem("username");
const password = sessionStorage.getItem("password");


export async function registerUser(
  name: string,
  pass: string,
  isActivated: boolean,
  nameOfUser : string
) {
  try {
    console.log(isActivated);
    const config = await getConfig();
    const baseURL = config.baseURL;
    const postUserURL = `${baseURL}/api/v1/user/add`;
  

    let newUser: User = {
      username: name,
      password: pass,
      enabled: isActivated,
      name: nameOfUser,
      roles: [
        {
            username: name,
            authority: "ROLE_USER"
        },
    ]
    };
    
    await axios
      .post(postUserURL, newUser, {
        headers: {
          Authorization: `Basic ${btoa(`${username}:${password}`)}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Ny användare är registrerad: ", response.data);
        return response.data;
      });
  } catch (error) {
    console.log(error);
  }
}
