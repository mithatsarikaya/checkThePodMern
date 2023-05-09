import useAuth from "./useAuth";

export default function useUserFetch({ method, url }) {
  const { auth } = useAuth();
  const BASE_URL = "http://localhost:3500/";
  const TOKEN = auth.token;
  console.log(method);
  console.log(url);

  const fetchFromUser = async (method, url) => {
    let responseFromServer = await fetch(`${BASE_URL}${url}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json",
        token: `Bearer ${TOKEN}`,
      },
    });

    return await responseFromServer.json();
  };

  return fetchFromUser();
}
