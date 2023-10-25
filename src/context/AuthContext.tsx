import { createContext, useEffect, useState } from "react";
import { AuthContextType } from "../@types/AuthContextType";
import { ContextProps } from "../interface/ContextProps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_AUTH, FIREBASE_DB } from "../auth/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { getMonthDatabase } from "../utils/getMonthDatabase";
import { queryUserFirestoreToken } from "../services/queryUserFirestoreToken";

export const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextProvider = ({ children }: ContextProps) => {
  const [userToken, setUserToken] = useState("");
  const [userFirestoreToken, setUserFirestoreToken] = useState("");
  const auth = FIREBASE_AUTH;

  const authenticate = (token: string) => {
    setUserToken(token);
    AsyncStorage.setItem("token", token);
  };

  const signup = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const token = userCredential.user.uid;
        authenticate(token);
        const monthCollection = getMonthDatabase();
        addDoc(collection(FIREBASE_DB, "users"), {
          userId: token,
          data: {
            [monthCollection]: {
              money: 0,
              categories: [],
              items: [],
            },
          },
        }).then((response) => setUserFirestoreToken(response.id));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const login = async (email: string, password: string): Promise<string> => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      authenticate(response.user.uid);
      return response.user.uid;
    } catch (error) {
      console.error(error);
    }
    return "";
  };

  const logout = () => {
    setUserToken("");
    setUserFirestoreToken("");
    AsyncStorage.removeItem("token");
  };

  useEffect(() => {
    async function fetchUserFirestoreToken() {
      if (userToken) {
        const token = await queryUserFirestoreToken(userToken);
        setUserFirestoreToken(token);
      }
    }
    fetchUserFirestoreToken();
  }, [userToken]);

  const value = {
    auth,
    userToken,
    userFirestoreToken,
    isAuthenticated: !!userToken,
    login,
    logout,
    signup,
    authenticate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
