import axios from "axios";
import { getConfig } from "../interfaces/configInterface";
import Activity, { TypeOfActivity } from "../interfaces/activityInterface";
import Participant from "../interfaces/participantInterface";

export async function checkInParticipant(currentUserId: string) {
  try {
    const config = await getConfig();
    const baseURL = config.baseURL;
    const postActivityURL = `${baseURL}/api/v1/activity/add`;

    let newActivity: any = {
      Participant: {
        id: currentUserId,
      },
      typeOfActivity: TypeOfActivity.CHECKED_IN,
    };
    await axios
      .post(postActivityURL, newActivity, {
        headers: {
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

    let newActivity: any = {
      Participant: {
        id: currentUserId,
      },
      typeOfActivity: TypeOfActivity.CHECKED_OUT,
    };
    await axios
      .post(postActivityURL, newActivity, {
        headers: {
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

    let newActivity: any = {
      Participant: {
        id: currentUserId,
      },
      typeOfActivity: TypeOfActivity.LEFT_THE_BUILDING,
    };
    await axios
      .post(postActivityURL, newActivity, {
        headers: {
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

    let newActivity: any = {
      Participant: {
        id: currentUserId,
      },
      typeOfActivity: TypeOfActivity.ENTERED_THE_BUILDING,
    };
    await axios
      .post(postActivityURL, newActivity, {
        headers: {
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
