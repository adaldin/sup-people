import { db } from "../../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

class APIservice {
  constructor() {
    this.allData = false;
  }

  async APICall() {
    try {
      const collref = collection(db, "supTrips");

      onSnapshot(collref, (querysnapshot) => {
        const data = querysnapshot.docs.map((result) => {
          return { ...result.data(), id: result.id };
        });
      });
    } catch (err) {
      console.log("Firestore error: ", err);
    }
  }
}

export default APIservice;
