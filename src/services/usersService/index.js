import { db } from "../../firebase/firebase";
import { getDoc, doc } from "firebase/firestore";

export async function getUserName(userUID) {
  let userFName;

  try {
    const docRef = doc(db, "users", userUID);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      userFName = await docSnap.data().user.fName;
    } else {
      console.log(`No data in db for user ${userUID}`);
    }
  } catch (err) {
    console.log(err);
  }
  return userFName;
}

// export function checkUserNextTrips(uid, usersTrips) {
//   let userExist = usersTrips.findIndex((trip) => trip.uid === uid);
//   if (userExist === -1) {
//     console.log("Creare usuare fc");
//     // createUser(uid,userTrips) en context user
//     //  fc en context que recibe uid y trips, y  lo que hace es un push de objeto user:
//     // const uid=uid, const nexTrips=[] nextrips.push(userTrips)
//     // let user={uid:uid, nextrips:nextrips}
//   } else {
//     console.log("aquí funcion de update user");
//     // loadUser(uid, userTrips)
//     // get current user trips, y ponerlos en:
//     //   // const uid=uid, const nexTrips=[] nextrips.push(userTrips)
//     // let user={uid:uid, nextrips:nextrips}
//   }
// }
