import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlQD6HReFC_c0RxYwXJ7keQN7g5nHcOrk",
  authDomain: "finance-control-9adc5.firebaseapp.com",
  projectId: "finance-control-9adc5",
  storageBucket: "finance-control-9adc5.appspot.com",
  messagingSenderId: "147286295641",
  appId: "1:147286295641:web:ed48adfec6260024095d48",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
