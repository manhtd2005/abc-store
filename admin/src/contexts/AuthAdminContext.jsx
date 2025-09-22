import { useState } from "react";
import { createContext } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthAdminContext = createContext();

const AuthAdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (username, password) => {
    if (username === import.meta.env.VITE_USERNAME_ADMIN) {
      if (password === import.meta.env.VITE_PASSWORD_ADMIN) {
        setIsAuthenticated(true);
        return true;
      }
    }
    return false;
  };

  const listValue = { isAuthenticated, setIsAuthenticated, login };

  return (
    <AuthAdminContext.Provider value={listValue}>
      {children}
    </AuthAdminContext.Provider>
  );
};

export default AuthAdminProvider;
