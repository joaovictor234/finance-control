import { Auth } from "firebase/auth";

export type AuthContextType = {
  token: string;
  auth: Auth;
  isAuthenticated: boolean;
  authenticate: (token: string) => void;
  signup: (email: string, password: string) => void;
  login: (email: string, password: string) => Promise<string>;
  logout: () => void;
};
