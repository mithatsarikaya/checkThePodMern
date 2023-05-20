import { useEffect, useState } from "react";
import Pod from "./Pod";
import useFetch from "../hooks/useFetch";
// import { fetchFromUser } from "../requestMethods";

export default function MyPods() {
  const [podsOfTheUser, setPodsOfTheUser] = useState([]);
  const { fetchFromUser } = useFetch();

  const personalPodsUrl = "pods/personalPods";
  const deletePodUrl = "pods";
  const resetPodUrl = "pods";

  // let data = useUserFetch("GET", "pods/personalPods");
  // console.log(data);

  useEffect(() => {
    fetchFromUser("GET", personalPodsUrl)
      .then((data) => data.json())
      .then((jsonData) => setPodsOfTheUser(jsonData));
  }, []);

  const handleDeletePod = (id) => {
    fetchFromUser("DELETE", deletePodUrl, { id }).then((res) => {
      console.log(res);
      if (res.ok) {
        console.log("it deleted");
        setPodsOfTheUser((prevPod) => prevPod.filter((p) => p._id !== id));
      }
    });
  };

  const handleResetPod = (id) => {
    fetchFromUser("PATCH", resetPodUrl, { id }).then((res) => {
      console.log(res);
      if (res.ok) {
        console.log("it reseted");
        setPodsOfTheUser((prevPod) => prevPod.filter((p) => p._id !== id));
      }
    });
  };

  const podsElements = podsOfTheUser.map((p) => (
    <Pod
      key={p._id}
      podId={p._id}
      creatorId={p.creatorId}
      podName={p.podName}
      usersOfThePod={p.usersOfThePod}
      podFreeWeight={p.podFreeWeight}
      podTotalWeight={p.podTotalWeight}
      productRawAmount={p.productRawAmount}
      handleDeletePod={handleDeletePod}
      handleResetPod={handleResetPod}
    />
  ));

  return <main>{podsElements}</main>;
}
