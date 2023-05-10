import { useEffect, useState } from "react";
import Pod from "./Pod";
import useAuth from "../hooks/useAuth";
import useUserFetch from "../hooks/useUserFetch";
// import { fetchFromUser } from "../requestMethods";
import fetchFromUser from "../funcs/fetchFromUser";

export default function MyPods() {
  const [podsOfTheUser, setPodsOfTheUser] = useState([]);
  // let data = useUserFetch("GET", "pods/personalPods");
  // console.log(data);

  useEffect(() => {
    let data = useUserFetch("GET", "pods/personalPods");
    console.log(data);
  }, []);

  // const { auth } = useAuth();

  // const jsonData = useUserFetch({
  //   reqMethod: "GET",
  //   reqUrl: "pods/personalPods",
  // });

  // useEffect(() => {
  //   setPodsOfTheUser(jsonData);
  // }, [jsonData]);

  // console.log(podsOfTheUser);

  /////**********works like a charm
  // useEffect(() => {
  //   fetch(`${url}pods/personalPods`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json", id: userId },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setPodsOfTheUser(data);
  //     });
  // }, []);

  // const podsElements = podsOfTheUser.map((p) => (
  //   <Pod
  //     podId={p._id}
  //     creator={p.creatorId}
  //     podName={p.podName}
  //     usersOfThePod={p.usersOfThePod}
  //     podFreeWeight={p.podFreeWeight}
  //     podTotalWeight={p.podTotalWeight}
  //     productRawAmount={p.productRawAmount}
  //   />
  // ));

  return (
    <main>
      <div>pods</div>
      {/* {podsElements} */}

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
