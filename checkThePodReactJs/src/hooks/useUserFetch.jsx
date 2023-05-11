import useAuth from "./useAuth";

export default function useFetch() {
  const { auth } = useAuth();
  const BASE_URL = "http://localhost:3500/";
  const TOKEN = auth.token;

  const fetchFromUser = async (method, url, body) => {
    let responseFromServer = await fetch(`${BASE_URL}${url}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${TOKEN}`,
      },
      body,
    });

    let responseFromServerJson = await responseFromServer.json();

    return responseFromServerJson;
  };

  return { fetchFromUser };
}
