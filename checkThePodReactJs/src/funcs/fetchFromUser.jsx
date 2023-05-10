import useAuth from "../hooks/useAuth";

export default async function fetchFromUser(method, url) {
  const { auth } = useAuth();
  const BASE_URL = "http://localhost:3500/";
  const TOKEN = auth.token;

  let responseFromServer = await fetch(`${BASE_URL}${url}`, {
    method: `${method}`,
    headers: {
      "Content-Type": "application/json",
      token: `Bearer ${TOKEN}`,
    },
  });
  let responseFromServerJson = await responseFromServer.json();

  return responseFromServerJson;
}
