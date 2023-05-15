import { useEffect, useState } from "react";
import SelectOfUsers from "./SelectOfUsers";
import LabelOfUser from "./LabelOfUser";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";

//users of the page : owner of the pod and users that add by the owner

export default function TakeFromPod() {
  const { fetchFromUser } = useFetch();
  const [pod, setPod] = useState({
    creatorId: "",
    podName: "",
    podFreeWeight: 0,
    podTotalWeight: 0,
    productRawAmount: 0,
  });

  const { podId } = useParams();

  let urlToGetPod = `pods/getThePod/${podId}`;

  useEffect(() => {
    fetchFromUser("GET", urlToGetPod)
      .then((res) => res.json())
      .then((jsonData) => {
        console.log(jsonData);
      });
  }, []);

  console.log(pod);

  const user = "nuuklu";
  const allUsers = ["nuuklu", "hypno", "user1", "user2", "user3"];

  const [usersOfThePod, setUsersOfThePod] = useState(["nuuklu", "user1"]);

  const allUsersExceptUser = [];

  allUsers.map((u) => {
    if (!usersOfThePod.includes(u)) allUsersExceptUser.push(u);
  });

  const url = "http://localhost:3500/pods";

  function postTheData() {}

  function handleChange(e) {
    setPod((prevPod) => ({
      ...prevPod,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit() {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pod),
    }).then((res) => console.log(res));
  }

  function removeFromPod(nameOfTheUser) {
    setUsersOfThePod((prevPod) => prevPod.filter((p) => p !== nameOfTheUser));
  }

  function addToPod(nameOfTheUser) {
    console.log(nameOfTheUser);
    setUsersOfThePod((prevPod) => [...prevPod, nameOfTheUser]);
  }

  return (
    <main>
      {podId}
      <form className="form--create-update" action="">
        <div className="createPod">
          <div className="createPodProp">
            <label htmlFor="">Pod Name</label>
            <input
              autoComplete="off"
              onChange={handleChange}
              name="podName"
              type="text"
              required
              readOnly
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
              readOnly
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
          <div className="createPodProp">
            <label htmlFor="">Share your pod with other users</label>
            {allUsersExceptUser.length !== 0 && (
              <SelectOfUsers users={allUsersExceptUser} addToPod={addToPod} />
            )}
          </div>
          <div className="usersOfThePodLabels">
            {usersOfThePod.map((u) => (
              <LabelOfUser user={u} removeFromPod={removeFromPod} />
            ))}
          </div>
          <div className="buttons">
            <button onClick={handleSubmit} className="createPod--button">
              Take
            </button>
            <button onClick={handleSubmit} className="createPod--button">
              Put
            </button>
            <button onClick={handleSubmit} className="createPod--button">
              Reset
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
