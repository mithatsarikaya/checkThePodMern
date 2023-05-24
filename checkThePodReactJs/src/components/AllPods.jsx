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

  return <main>{podElements}</main>;
}
