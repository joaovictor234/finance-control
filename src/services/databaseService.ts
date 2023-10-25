import { DocumentData, DocumentReference, setDoc } from "firebase/firestore";
import { getMonthDatabase } from "../utils/getMonthDatabase";

export class DatabaseService {
  static async createNewMonthData(
    userDocRef: DocumentReference<DocumentData, DocumentData>
  ) {
    await setDoc(
      userDocRef,
      {
        [`data.${getMonthDatabase()}`]: {
          money: 0,
          categories: [],
          items: [],
        },
      },
      { merge: true }
    );
  }
}
