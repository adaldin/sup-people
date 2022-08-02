// import { db } from "../../firebase/firebase";
// import { collection, onSnapshot } from "firebase/firestore";

// class SupTripsService{
//   constructor(){

//   }

//   async getAllSupTrips() {
//     try {
//       const collref = collection(db, "supTrips");

//       onSnapshot(collref, (querysnapshot) => {
//         const data = querysnapshot.docs.map((result) => {
//           return { ...result.data(), id: result.id };
//         });
//         // console.log(data); aquí obtengo array de objetos de firestore
//         return data
//       });
//     } catch (err) {
//       console.log("Firestore error: ", err);
//     }

// }
// export default new SupTripsService
// export async function getAllSupTrips() {
//   try {
//     const collref = collection(db, "supTrips");

//     onSnapshot(collref, (querysnapshot) => {
//       const data = querysnapshot.docs.map((result) => {
//         return { ...result.data(), id: result.id };
//       });
//       // console.log(data); aquí obtengo array de objetos de firestore
//     });
//   } catch (err) {
//     console.log("Firestore error: ", err);
//   }
// }

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
        // console.log(querysnapshot);
        const data = querysnapshot.docs.map((result) => {
          // console.log(result);
          return { ...result.data(), id: result.id };
        });
        return data;
      });
    } catch (err) {
      console.log("Firestore error: ", err);
    }
  }
}

export default APIservice;
