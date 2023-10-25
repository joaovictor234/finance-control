import { doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "../auth/firebaseConfig";
import { Category } from "../models/Category";
import { getMonthDatabase } from "../utils/getMonthDatabase";

export class CategoriesService {
  static async updateCategories(
    categories: Category[],
    userFirestoreToken: string,
    monthYearData: Date
  ) {
    const userDocRef = doc(FIREBASE_DB, "users", userFirestoreToken);
    await updateDoc(userDocRef, {
      [`data.${getMonthDatabase(
        monthYearData ? monthYearData : undefined
      )}.categories`]: categories,
    });
  }
}
