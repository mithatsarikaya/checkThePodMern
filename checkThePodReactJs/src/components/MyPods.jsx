import { useEffect, useState } from "react";
import Pod from "./Pod";
import useFetch from "../hooks/useFetch";
import { useAutoAnimate } from "@formkit/auto-animate/react";
// import { fetchFromUser } from "../requestMethods";

export default function MyPods() {
  const [myPods, setMyPods] = useState([]);
  const { fetchFromUser } = useFetch();

  const personalPodsUrl = "pods/personalPods";
  const deletePodUrl = "pods";

  const [podList] = useAutoAnimate();

  // let data = useUserFetch("GET", "pods/personalPods");
  // console.log(data);

  useEffect(() => {
    fetchFromUser("GET", personalPodsUrl)
      .then((data) => data.json())
      .then((jsonData) => setMyPods(jsonData));
  }, []);

  const handleDeletePod = (id) => {
    fetchFromUser("DELETE", deletePodUrl, { id }).then((res) => {
      console.log(res);
      if (res.ok) {
        console.log("it deleted");
        setMyPods((prevPod) => prevPod.filter((p) => p._id !== id));
      }
    });
  };

  const handleResetPod = (id) => {
    let resetPodUrl = `pods/getThePod/${id}`;
    fetchFromUser("PATCH", resetPodUrl).then((res) => {
      console.log(res);
      if (res.ok) {
        console.log("it reseted");
        setMyPods((prevPod) =>
          prevPod.map((p) => {
            if (p._id === id) {
              return { ...p, productRawAmount: 0, podTotalWeight: 0 };
            } else {
              return p;
            }
          })
        );
        // setMyPods((prevPod) => prevPod.filter((p) => p._id !== id));
      }
    });
  };

  const podsElements = myPods.map((p) => (
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

  return <main ref={podList}>{podsElements}</main>;
}
