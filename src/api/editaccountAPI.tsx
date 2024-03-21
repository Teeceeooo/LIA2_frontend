import axios from "axios";
import { getConfig } from "../interfaces/configInterface";
import User from "../interfaces/userInterface";

export async function editUserAccount(username : string, userpassword : string, isActivated : boolean, nameOfUser : string) {
    try {
        const config = await getConfig();
        const baseURL = config.baseURL;
        const postUserURL = `${baseURL}/api/v1/user/edit`;
        const usernameLogin = sessionStorage.getItem("username");
        const passwordLogin = sessionStorage.getItem("password");
    
        let newUser: User = {
          username: username,
          password: userpassword,
          enabled: isActivated,
          name: nameOfUser,
          roles: [
            {
                username: nameOfUser,
                authority: "ROLE_USER"
            },
        ]
        };
        
        await axios
          .post(postUserURL, newUser, {
            headers: {
              Authorization: `Basic ${btoa(`${usernameLogin}:${passwordLogin}`)}`,
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