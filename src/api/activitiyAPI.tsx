import axios from "axios";
import { getConfig } from "../interfaces/configInterface";
import { TypeOfActivity } from "../interfaces/activityInterface";

export async function checkInParticipant(currentUserId: string) {
  try {
    const config = await getConfig();
    const baseURL = config.baseURL;
    const postActivityURL = `${baseURL}/api/v1/activity/add`;
    const token = sessionStorage.getItem("token");

    let newActivity: any = {
      Participant: {
        id: currentUserId,
      },
      typeOfActivity: TypeOfActivity.CHECKED_IN,
    };
    await axios
      .post(postActivityURL, newActivity, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Aktiviteten postades: ", response.data);
        return response.data;
      });
  } catch (error) {
    console.log(error);
  }
}

export async function checkOutParticipant(currentUserId: string) {
  try {
    const config = await getConfig();
    const baseURL = config.baseURL;
    const postActivityURL = `${baseURL}/api/v1/activity/add`;
    const token = sessionStorage.getItem("token");

    let newActivity: any = {
      Participant: {
        id: currentUserId,
      },
      typeOfActivity: TypeOfActivity.CHECKED_OUT,
    };
    await axios
      .post(postActivityURL, newActivity, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Aktiviteten postades: ", response.data);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function leavingParticipant(currentUserId: string) {
  try {
    const config = await getConfig();
    const baseURL = config.baseURL;
    const postActivityURL = `${baseURL}/api/v1/activity/add`;
    const token = sessionStorage.getItem("token");

    let newActivity: any = {
      Participant: {
        id: currentUserId,
      },
      typeOfActivity: TypeOfActivity.LEFT_THE_BUILDING,
    };
    await axios
      .post(postActivityURL, newActivity, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Aktiviteten postades: ", response.data);
      });
  } catch (error) {
    console.log(error);
  }
}

export async function returningParticipant(currentUserId: string) {
  try {
    const config = await getConfig();
    const baseURL = config.baseURL;
    const postActivityURL = `${baseURL}/api/v1/activity/add`;
    const token = sessionStorage.getItem("token");

    let newActivity: any = {
      Participant: {
        id: currentUserId,
      },
      typeOfActivity: TypeOfActivity.ENTERED_THE_BUILDING,
    };
    await axios
      .post(postActivityURL, newActivity, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Aktiviteten postades: ", response.data);
      });
  } catch (error) {
    console.log(error);
  }
}
