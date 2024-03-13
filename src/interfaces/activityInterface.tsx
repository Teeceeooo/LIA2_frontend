import Participant from "./participantInterface";

export enum TypeOfActivity {
  CHECKED_IN = "CHECKED_IN",
  CHECKED_OUT = "CHECKED_OUT",
  LEFT_THE_BUILDING = "LEFT_THE_BUILDING",
  ENTERED_THE_BUILDING = "ENTERED_THE_BUILDING",
}

interface Activity {
  id?: number;
  Participant: {
    id: string;
  };
  typeOfActivity?: TypeOfActivity;
  timeOfActivity?: string;
}

export default Activity;
