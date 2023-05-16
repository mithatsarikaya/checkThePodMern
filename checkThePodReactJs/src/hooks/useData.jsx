import { useContext } from "react";
import UserContext from "../context/UserProvider";

export default function useData() {
  return useContext(UserContext);
}
