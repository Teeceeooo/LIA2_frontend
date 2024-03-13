/* Utan bild för tillfället för att se att annat fungerar först... */
import Activity from "./activityInterface";
import Item from "./itemInterface";

interface Participant {
  id: string;
  fullName: string;
  telephoneNumber: string;
  comment: string;
  image: {
    imageUrl: string;
  };
  participantItems: Item[];
  activityList?: Activity[];
}

export default Participant;
