import useAuth from "./useAuth";

export default function useUserFetch({ reqMethod, reqUrl }) {
  const { auth } = useAuth();
  const BASE_URL = "http://localhost:3500/";
  const TOKEN = auth.token;

  const fetchFromUser = async (method, url) => {
    console.log(method);
    console.log(url);
    let responseFromServer = await fetch(`${BASE_URL}${url}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${TOKEN}`,
      },
    });

    return await responseFromServer.json();
  };

  console.log(fetchFromUser());

  return fetchFromUser(reqMethod, reqUrl);
}
