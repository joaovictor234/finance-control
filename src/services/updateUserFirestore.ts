import { DocumentData, DocumentReference, updateDoc } from "firebase/firestore";
import { Category } from "../models/Category";
import { Item } from "../models/Item";
import { getMonthDatabase } from "../utils/getMonthDatabase";

export const updateUserFirestore = async (
  userFirestoreReference: DocumentReference<DocumentData, DocumentData>,
  money: number,
  categories: Category[],
  items: Item[]
) => {
  await updateDoc(userFirestoreReference, {
    data: {
      [getMonthDatabase()]: {
        money,
        categories,
        items,
      },
    },
  });
};
