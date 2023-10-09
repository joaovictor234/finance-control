import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../auth/firebaseConfig";

export const queryUserFirestoreToken = async (token: string) => {
  try {
    const usersRef = collection(FIREBASE_DB, "users");
    const queryUser = query(usersRef, where("userId", "==", token));
    const queryUserSnapshot = await getDocs(queryUser);
    let userToken = "";
    queryUserSnapshot.forEach((doc) => {
      userToken = doc.id;
    });
    return userToken;
  } catch (error) {
    console.log(error);
  }
  return "";
};
