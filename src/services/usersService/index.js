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
