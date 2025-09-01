import React, { createContext, useContext, useEffect, useState } from "react";
import { parse } from "cookie";
type AuthContextType = {
  isLoggedIn: boolean;
  username: string | null;
  userId: string | null;
  login: (userId: string, username: string) => void;
  logout: () => void;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookies = parse(document.cookie || "");
      setUserId(cookies.user_id || null);
      setUsername(cookies.username || null);
    }
  }, []);

  const login = (userId: string, username: string) => {
    setUserId(userId);
    setUsername(username);
  };
  const logout = () => {
    setUserId(null);
    setUsername(null);
  };
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!userId,
        userId,
        username,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Something error");
  }
  return context;
};
