import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import ShareUnshareWithUser from "./ShareUnshareWithUser";

//users of the page : owner of the pod and users that add by the owner

export default function TakeFromPod() {
  const { podId } = useParams();
  const { fetchFromUser } = useFetch();
  const { allUsernames } = useData();
  const { auth } = useAuth();
  const [usersOfThePod, setUsersOfThePod] = useState([]);
  const [remainingValueOnScale, setRemainingValueOnScale] = useState("");
  const [allUsersExceptUsersOfThePod, setAllUsersExceptUsersOfThePod] =
    useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [pod, setPod] = useState({
    podId: "",
    creatorId: "",
    usersOfThePod: usersOfThePod,
    podName: "",
    podFreeWeight: 0,
    podTotalWeight: 0,
    productRawAmount: 0,
  });
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    setPod((prevPod) => ({ ...prevPod, usersOfThePod }));
    setAllUsersExceptUsersOfThePod(
      allUsernames.filter((a) => !usersOfThePod.includes(a))
    );
    console.log({ pod });
  }, [usersOfThePod]);

  let urlToGetPod = `pods/getThePod/${podId}`;

  console.log({ pod });

  //get the pod infos to take from it
  useEffect(() => {
    fetchFromUser("GET", urlToGetPod)
      .then((res) => res.json())
      .then((jsonData) => {
        console.log({ podData: jsonData });
        setIsOwner(auth.id === jsonData.creatorId);
        const initialUsersOfThePod = jsonData.usersOfThePod.map(
          (u) => u.username
        );
        setUsersOfThePod(initialUsersOfThePod);
        const initialPodData = {
          podId: jsonData._id,
          creatorId: jsonData.creatorId,
          podFreeWeight: jsonData.podFreeWeight,
          podName: jsonData.podName,
          podTotalWeight: jsonData.podTotalWeight,
          productRawAmount: jsonData.productRawAmount,
          usersOfThePod: initialUsersOfThePod,
        };
        setPod(initialPodData);
        setInitialValues(initialPodData);
      });
  }, []);

  // console.log(pod);

  // allUsers.map((u) => {
  //   if (!usersOfThePod.includes(u)) allUsersExceptUsersOfThePod.push(u);
  // });

  const url = "http://localhost:3500/pods";

  function handleUpdate(e) {
    e.preventDefault();
    fetchFromUser("PATCH", "pods", pod)
      .then((res) => res.json())
      .then((jsonData) => console.log(jsonData));
  }

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

  function handleTake(e) {
    console.log(e.target.value);
    if (e.target.value > 0) {
      setPod(initialValues);
      let askedValueToTake = e.target.value;

      setPod((prevPod) => ({
        ...prevPod,
        productRawAmount: prevPod.productRawAmount - askedValueToTake,
        podTotalWeight:
          prevPod.podTotalWeight -
          ((prevPod.podTotalWeight - prevPod.podFreeWeight) /
            prevPod.productRawAmount) *
            askedValueToTake,
      }));
    }
    if (e.target.value === "") {
      setPod(initialValues);
    }
  }

  console.log({ initialValues });

  useEffect(() => {
    setRemainingValueOnScale(pod.podTotalWeight);
  }, [pod.podTotalWeight]);

  return (
    <main>
      <form className="form--create-update" action="">
        <div className="createPod">
          <div className="createPodProp">
            <label htmlFor="">Pod Name</label>
            <input
              autoComplete="off"
              value={pod.podName}
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
              value={pod.podFreeWeight}
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
              value={pod.podTotalWeight}
              autoComplete="off"
              onChange={handleChange}
              name="podTotalWeight"
              type="number"
              readOnly
            />
          </div>
          <div className="createPodProp">
            <label htmlFor="">Pod Raw Product</label>
            <input
              value={pod.productRawAmount}
              autoComplete="off"
              onChange={handleChange}
              name="productRawAmount"
              type="number"
              readOnly
            />
          </div>
          <div className="createPodProp">
            <label htmlFor="">How Much Raw Product Do You Want ?</label>
            <input
              autoComplete="off"
              onChange={handleTake}
              name="takeProductRawAmount"
              type="number"
            />
          </div>
          <div className="createPodProp">
            <label htmlFor="">Remaining Value On Scale</label>
            <input
              value={remainingValueOnScale}
              placeholder="0"
              autoComplete="off"
              name="remainingValueOnScale"
              type="number"
              readOnly
            />
          </div>

          {/* <div>
            {"allUsersExceptUsersOfThePod:" + allUsersExceptUsersOfThePod}
          </div>
          <div>{"podUsers: " + usersOfThePod}</div>
          <div>{"isOwner: " + isOwner}</div> */}

          {isOwner && (
            <ShareUnshareWithUser
              allUsersExceptUsersOfThePod={allUsersExceptUsersOfThePod}
              setAllUsersExceptUsersOfThePod={setAllUsersExceptUsersOfThePod}
              usersOfThePod={usersOfThePod}
              setUsersOfThePod={setUsersOfThePod}
            />
          )}
          <div className="buttons">
            <button
              disabled={initialValues.productRawAmount === pod.productRawAmount}
              onClick={handleUpdate}
              className="createPod--button"
            >
              {isOwner ? "Take/Update" : "Take"}
            </button>
            {/* <button onClick={handleSubmit} className="createPod--button">
              Put
            </button> */}
            {/* <button className="createPod--button">Reset</button> */}
          </div>
        </div>
      </form>
    </main>
  );
}
