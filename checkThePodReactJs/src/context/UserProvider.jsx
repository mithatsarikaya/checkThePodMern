import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const { fetchFromUser } = useFetch();
  const { auth } = useAuth();
  let onlineUsername = auth?.username;
  const [allUsernames, setAllUsernames] = useState([]);

  useEffect(() => {
    if (onlineUsername) {
      fetchFromUser("GET", "users")
        .then((res) => res.json())
        .then((jsonData) => {
          setAllUsernames([...jsonData].map((j) => j.username));
        });
    }
  }, [onlineUsername]);

  return (
    <UserContext.Provider value={{ allUsernames, setAllUsernames }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
