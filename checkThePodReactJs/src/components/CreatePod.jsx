import { useState, useEffect } from "react";
import { RiLoaderFill } from "react-icons/ri";
import useAuth from "../hooks/useAuth";
import useFetch from "../hooks/useFetch";
import useData from "../hooks/useData";
import ShareUnshareWithUser from "./ShareUnshareWithUser";

export default function CreatePod() {
  const { auth } = useAuth();
  const { fetchFromUser } = useFetch();
  const { allUsernames } = useData();
  const [isLoading, setIsLoading] = useState(false);
  const [allUsersExceptUser, setAllUsersExceptUser] = useState([]);

  useEffect(() => {
    setAllUsersExceptUser(allUsernames.filter((a) => a !== auth.username));
  }, []);

  const [serverMessage, setServerMessage] = useState({
    message: "",
    ok: false,
  });

  const user = auth.username;

  //owner is default user of the pod, user cannot remove himself
  const [usersOfThePod, setUsersOfThePod] = useState([user]);

  const [pod, setPod] = useState({
    creatorId: auth.id,
    podName: "",
    podFreeWeight: 0,
    podTotalWeight: 0,
    productRawAmount: 0,
    usersOfThePod: usersOfThePod,
  });

  //my very first figuring out of necessity of useEffect, i am quite happy darling
  useEffect(() => {
    setPod((prevPod) => ({ ...prevPod, usersOfThePod }));
  }, [usersOfThePod]);

  function handleChange(e) {
    setPod((prevPod) => ({
      ...prevPod,
      [e.target.name]: e.target.value,
    }));
  }

  //findimg

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetchFromUser("POST", "pods", pod)
      .then((res) => {
        setServerMessage((prevMsg) => ({ ...prevMsg, ok: res.ok }));
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setServerMessage((prevMsg) => ({ ...prevMsg, message: data.message }));
      });
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="form--create-update">
        <div className="createPod">
          <div className="createPodProp">
            <label htmlFor="">Pod Name</label>
            <input
              autoComplete="off"
              onChange={handleChange}
              name="podName"
              type="text"
              required
            />
          </div>
          <div className="createPodProp">
            <label htmlFor="">Pod Tare</label>
            <input
              autoComplete="off"
              onChange={handleChange}
              name="podFreeWeight"
              type="number"
              required
            />
          </div>
          <div className="createPodProp">
            <label htmlFor="">Pod Total</label>
            <input
              autoComplete="off"
              onChange={handleChange}
              name="podTotalWeight"
              type="number"
            />
          </div>
          <div className="createPodProp">
            <label htmlFor="">Pod Raw Product</label>
            <input
              autoComplete="off"
              onChange={handleChange}
              name="productRawAmount"
              type="number"
            />
          </div>
          <ShareUnshareWithUser
            allUsersExceptUser={allUsersExceptUser}
            setAllUsersExceptUser={setAllUsersExceptUser}
            usersOfThePod={usersOfThePod}
            setUsersOfThePod={setUsersOfThePod}
          />

          {isLoading && <RiLoaderFill />}
          {serverMessage && (
            <p style={{ color: serverMessage.ok ? "green" : "red" }}>
              {serverMessage.message}
            </p>
          )}

          <button disabled={serverMessage.ok} className="createPod--button">
            Create
          </button>
        </div>
      </form>
    </main>
  );
}
