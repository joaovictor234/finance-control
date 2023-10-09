import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { FIREBASE_DB } from "../auth/firebaseConfig";
import { getMonthDatabase } from "../utils/getMonthDatabase";
import { Item } from "../models/Item";

export const queryMonthItems = async (userFirestoreToken: string, date: Date): Promise<Item[]> => {
  const userDocRef = doc(FIREBASE_DB, "users", userFirestoreToken);
  const userDocSnapshot = await getDoc(userDocRef);
  if (userDocSnapshot.exists()) {
    const userData = userDocSnapshot.data();
    if (userData.data[getMonthDatabase(date)]) {
      const itemsForMonth = userData.data[getMonthDatabase(date)].items;
      return itemsForMonth;
    } else {
      return [];
    }
  } else {
    return [];
  }
};
