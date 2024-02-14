/* Utan bild för tillfället för att se att annat fungerar först... */

import Participant from "./participantInterface";

interface Item {
    id?: number,
    description? : string,
    Participant? : Participant,
}

export default Item;