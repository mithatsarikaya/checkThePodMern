import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import PodHome from "./PodHome";

export default function AllPods() {
  const [pods, setPods] = useState([]);
  const { fetchPublic } = useFetch();

  useEffect(() => {
    fetchPublic("GET", "pods")
      .then((res) => res.json())
      .then((jsonData) => setPods(jsonData));
  }, []);

  const podElements = pods.map((pod) => (
    <PodHome
      key={pod._id}
      creatorUsername={pod.creatorId.username}
      podName={pod.podName}
      podFreeWeight={pod.podFreeWeight}
      podTotalWeight={pod.podTotalWeight}
      productRawAmount={pod.productRawAmount}
    />
  ));

  return (
    <main>
      {podElements}
      {/* <div className="pod">
        <div className="podName">
          <label htmlFor="">Pod Name</label>
          <h3 className="podName--title">Pod Pilav</h3>
        </div>
        <div className="podTare">
          <label htmlFor="">Pod Tare</label>
          <h3 className="podName--tare">300</h3>
        </div>
        <div className="podTotal">
          <label htmlFor="">Pod Total</label>
          <h3 className="podName--total">1200</h3>
        </div>
        <div className="podRaw">
          <label htmlFor="">Raw Product</label>
          <h3 className="podName--raw">400</h3>
        </div>
      </div>
      <div className="pod">
        <div className="podName">
          <label htmlFor="">Pod Name</label>
          <h3 className="podName--title">Pod Pilav</h3>
        </div>
        <div className="podTare">
          <label htmlFor="">Pod Tare</label>
          <h3 className="podName--tare">300</h3>
        </div>
        <div className="podTotal">
          <label htmlFor="">Pod Total</label>
          <h3 className="podName--total">1200</h3>
        </div>
        <div className="podRaw">
          <label htmlFor="">Raw Product</label>
          <h3 className="podName--raw">400</h3>
        </div>
      </div> */}
    </main>
  );
}
