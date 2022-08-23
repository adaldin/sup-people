import { db } from "../../firebase/firebase";
import {
  collection,
  query,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";

export async function getUserName(userUID) {
  let userFName;
  try {
    const docRef = doc(db, "users", userUID);
    const docSnap = await getDoc(docRef);
    userFName = await docSnap.data().fName;
    console.log(userFName);
  } catch (err) {
    console.log(err);
  }
  return userFName;
}
