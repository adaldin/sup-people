import {
  collection,
  query,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";

export async function getSupTrips() {
  let totalSupTrips = [];

  try {
    const trips = query(collection(db, "supTrips"));
    const querySnapshot = await getDocs(trips);
    querySnapshot.forEach((doc) => {
      let newTrip = { ...doc.data(), id: doc.id };
      totalSupTrips.push(newTrip);
    });
  } catch (err) {
    console.log("Firestore error: ", err);
    return [];
  }
  return totalSupTrips;
}

export async function updateTrips(trip) {
  try {
    const docRef = await addDoc(collection(db, "supTrips"), trip);
    console.log("Document written with ID: ", docRef.id);
  } catch (err) {
    console.log("Firestore error: ", err);
    return [];
  }
}

export async function deleteTrip(trip) {
  try {
    const docRef = await deleteDoc(doc(db, "cities", trip.id));
    console.log("Document deleted: ", docRef);
  } catch (err) {
    console.log("Firestore error: ", err);
    return [];
  }
}

export function getSuptripsByAtendees(suptrips, uid) {
  const userSuptrips = suptrips.filter((suptrip) => {
    return suptrip.atendees.includes(uid) && suptrip.createdBy !== uid;
  });
  return userSuptrips;
}

// fc para context users

// export async function getUsersSupTrips() {
//   let user={}
//   let uid = "wK1fOSI0cuNgSTMkYeImPO75IwH2";
//   const q = query(collection(db, "supTrips"), where("createdBy", "==", uid));
//   // const query = await collection("supTrips").where("createdBy", "==", uid);
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });
// }

// export function getSuptripsByCreators(suptrips, uid) {
//   const userSuptrips = suptrips.filter((suptrip) => suptrip.createdBy === uid);
//   return userSuptrips;
// }

// export function getSuptripsByUsers(suptrips) {
//   let usersSuptrips = [];
//   suptrips.map((suptrip) => {
//     const uid = suptrip.createdBy;
//     const nextTrips = getSuptripsByAtendees(suptrips, uid);
//     const createdTrips = getSuptripsByCreators(suptrips, uid);

//     usersSuptrips.map(userSuptrip=>{
//       if(userSuptrip.uid!==uid){
//         let user = { uid: uid, nextTrips: nextTrips, createdTrips: createdTrips };
//         usersSuptrips.push(user);
//       }else{
//         let user={...userSuptrip,}
//       }
//     })

//     return usersSuptrips;
//   });
//   return usersSuptrips;
// }
