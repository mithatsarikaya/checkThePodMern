import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import useFetch from "./useFetch";
import jwt_decode from "jwt-decode";
//TODO:
//TODO:
//TODO:
export default function useLoginLogout() {
  const { setAuth } = useAuth();
  const { fetchPublic } = useFetch();
  const navigate = useNavigate();

  async function handleLogin(username, password) {
    let response = await fetchPublic("POST", "auth", { username, password });

    return response;
  }
  async function handleLoginAfterRegistration(username, password) {
    let response = await fetchPublic("POST", "auth", { username, password });

    if (!response.ok) {
      let errMsg = await response.json();
    } else {
      let responseJson = await response.json();
      let token = responseJson.accessToken;
      var decoded = jwt_decode(token);
      setAuth({ ...decoded.UserInfo, token });

      //if user manages to login then send him to main page
      setTimeout(() => navigate("/myPods"), 1500);
    }
  }

  function handleLogout() {
    setAuth({});
  }

  return { handleLogin, handleLogout, handleLoginAfterRegistration };
}
