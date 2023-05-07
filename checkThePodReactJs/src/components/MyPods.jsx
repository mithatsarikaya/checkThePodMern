import { useEffect, useState } from "react";
import Pod from "./Pod";
import useAuth from "../hooks/useAuth";

export default function MyPods() {
  const [podsOfTheUser, setPodsOfTheUser] = useState([]);
  const { auth } = useAuth();
  const url = "http://localhost:3500/";

  useEffect(() => {
    fetch(`${url}pods/personalPods`, {
      method: "GET",
      header: { "Content-Type": "application/json" },
      body: auth._id,
    }).then();
  }, []);

  return (
    <main>
      {/* <div className="pod">
        <div className="podName">
          <label htmlFor="">Pod Name</label>
          <h3 className="podName--title">Pod Tavuk</h3>
        </div>
        <div className="podTare">
          <label htmlFor="">Pod Tare</label>
          <h3 className="podName--tare">200</h3>
        </div>
        <div className="podTotal">
          <label htmlFor="">Pod Total</label>
          <h3 className="podName--total">1000</h3>
        </div>
        <div className="podRaw">
          <label htmlFor="">Raw Product</label>
          <h3 className="podName--raw">300</h3>
        </div>
      </div> */}
    </main>
  );
}
