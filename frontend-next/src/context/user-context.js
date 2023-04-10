import { createContext, useState } from 'react';

export const UserContextData = createContext(null);

export default function UserContext({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const userHasAuthenticated = (authenticated) => {
    setIsAuthenticated(authenticated);
  };

  const childProps = {
    isAuthenticated: isAuthenticated,
    userHasAuthenticated: userHasAuthenticated,
  };

  return (
    <UserContextData.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContextData.Provider>
  );
}
