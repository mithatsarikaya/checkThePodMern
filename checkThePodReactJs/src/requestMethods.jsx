import { useContext } from "react";
import AuthContext from "./context/AuthProvider";

// const { auth } = useContext(AuthContext);
const BASE_URL = "http://localhost:3500/";
// const TOKEN = auth.token;

export const fetchFromPublic = (method, headers) => {};
export const fetchFromUser = async (method, url) => {
  let responseFromServer = await fetch(`${BASE_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      token: `Bearer ${TOKEN}`,
    },
  });

  return await responseFromServer.json();
};
