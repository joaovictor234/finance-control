import {
  DocumentData,
  DocumentReference,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { getMonthDatabase } from "../utils/getMonthDatabase";

export class DatabaseService {
  static async createNewMonthData(
    userDocRef: DocumentReference<DocumentData, DocumentData>
  ) {
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
      await setDoc(userDocRef, {
        data: {
          ...userDoc.data().data,
          [getMonthDatabase()]: {
            money: 0,
            categories: [],
            items: [],
          },
        },
      });
    }
  }
}
