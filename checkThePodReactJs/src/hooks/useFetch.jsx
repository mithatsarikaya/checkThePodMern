import useAuth from "./useAuth";

export default function useFetch() {
  const { auth } = useAuth();
  // const BASE_URL = "http://localhost:3500/";
  // const BASE_URL = "http://192.168.1.103:3500/";
  const BASE_URL = "https://checkthepod-api.onrender.com/";
  const TOKEN = auth.token;

  const fetchFromUser = async (method, url, body) => {
    let responseFromServer = await fetch(`${BASE_URL}${url}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify(body),
    });

    //need detailed response. so commented this line
    // let responseFromServerJson = await responseFromServer.json();

    return responseFromServer;
  };

  const fetchPublic = async (method, url, body) => {
    console.log(`${BASE_URL}${url}`);
    let responseFromServer = await fetch(`${BASE_URL}${url}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return responseFromServer;
  };

  return { fetchFromUser, fetchPublic };
}
