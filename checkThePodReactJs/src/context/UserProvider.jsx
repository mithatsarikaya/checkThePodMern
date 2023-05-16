import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [allUsernames, setAllUsernames] = useState([]);

  return (
    <UserContext.Provider value={{ allUsernames, setAllUsernames }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
