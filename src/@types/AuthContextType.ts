import { Auth } from "firebase/auth";

export type AuthContextType = {
  auth: Auth;
  userToken: string;
  isAuthenticated: boolean;
  userFirestoreToken: string;
  authenticate: (token: string) => void;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => Promise<string>;
  logout: () => void;
};
