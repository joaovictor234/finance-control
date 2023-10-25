import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../auth/firebaseConfig";
import { getMonthDatabase } from "../utils/getMonthDatabase";

export class MoneyServices {
  static async updateMoney(
    money: number,
    userFirestoreToken: string,
    selectedMonthYear?: Date
  ) {
    const userDocRef = doc(FIREBASE_DB, "users", userFirestoreToken);
    try {
      if (selectedMonthYear) {
        await updateDoc(userDocRef, {
          [`data.${getMonthDatabase(selectedMonthYear)}.money`]: money,
        });
      } else {
        await updateDoc(userDocRef, {
          [`data.${getMonthDatabase()}.money`]: money,
        });
      }
    } catch (error) {
      console.log("moneyService:updateMoney: ", error);
    }
  }
}
