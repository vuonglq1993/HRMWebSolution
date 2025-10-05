import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(null);

  // Load token từ localStorage khi refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) setTokenState(savedToken);
  }, []);

  const setToken = (newToken: string | null) => {
    if (newToken) {
      localStorage.setItem("token", newToken);
    } else {
      localStorage.removeItem("token");
    }
    setTokenState(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 👇 Custom hook để dùng trong component
export const useAuth = () => {
  return useContext(AuthContext);
};
