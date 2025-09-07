import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  username: string | null;
  userId: string | null;
  login: (userId: string, username: string) => void;
  logout: () => void;
};
type AuthProviderProps = {
  children: React.ReactNode;
  initialUserId?: string | null;
  initialUsername?: string | null;
};
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
  initialUserId = null,
  initialUsername = null,
}: AuthProviderProps) => {
  const [userId, setUserId] = useState<string | null>(initialUserId);
  const [username, setUsername] = useState<string | null>(initialUsername);

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
