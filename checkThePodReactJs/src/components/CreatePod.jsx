import { useState, useContext } from "react";
import useAuth from "../hooks/useAuth";

export default function CreatePod() {
  const { auth, setAuth } = useAuth();
  console.log(auth);

  const [pod, setPod] = useState({
    creatorId: "",
    podName: "",
    podFreeWeight: 0,
    podTotalWeight: 0,
    productRawAmount: 0,
  });

  const url = "http://localhost:3500/pods";

  function handleChange(e) {
    setPod((prevPod) => ({
      ...prevPod,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit() {
    setPod((prevPod) => ({ ...prevPod, creatorId: auth.id }));

    console.log(pod);
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
          <select name="" id="">
            <option value="user1">user1</option>
            <option value="user2">user2</option>
            <option value="user3">user3</option>
          </select>
        </div>

        <button onClick={handleSubmit} className="createPod--button">
          Create
        </button>
      </div>
    </main>
  );
}
