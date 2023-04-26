import { useState } from "react";

export default function CreatePod() {
  const [pod, setPod] = useState({
    creatorId: "",
    podName: "",
    podFreeWeight: 0,
    podTotalWeight: 0,
    productRawAmount: 0,
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
          <input onChange={handleChange} name="podName" type="text" required />
        </div>
        <div className="createPodProp">
          <label htmlFor="">Pod Tare</label>
          <input
            onChange={handleChange}
            name="podFreeWeight"
            type="number"
            required
          />
        </div>
        <div className="createPodProp">
          <label htmlFor="">Pod Total</label>
          <input onChange={handleChange} name="podTotalWeight" type="number" />
        </div>
        <div className="createPodProp">
          <label htmlFor="">Pod Raw Product</label>
          <input
            onChange={handleChange}
            name="productRawAmount"
            type="number"
          />
        </div>
        <button onClick={handleSubmit} className="createPod--button">
          Create
        </button>
      </div>
    </main>
  );
}
