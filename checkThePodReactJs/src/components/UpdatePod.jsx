import { useState } from "react";
import SelectOfUsers from "./SelectOfUsers";

export default function CreatePod() {
  const [pod, setPod] = useState({
    creatorId: "",
    podName: "",
    podFreeWeight: 0,
    podTotalWeight: 0,
    productRawAmount: 0,
  });

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
  console.log(pod);

  function handleSubmit() {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pod),
    }).then((res) => console.log(res));
  }

  return (
    <main>
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
        <div className="createPodProp">
          <label htmlFor="">Add User to use together this pod</label>
          <SelectOfUsers users={allUsersExceptUser} />
          {/* <select name="" id="">
            <option value="user1">user1</option>
            <option value="user2">user2</option>
            <option value="user3">user3</option>
          </select> */}
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
    </main>
  );
}
