import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import { RiLoaderFill } from "react-icons/ri";
import ShareUnshareWithUser from "./ShareUnshareWithUser";
import ReverseButton from "./ReverseButton";

//users of the page : owner of the pod and users that add by the owner

export default function TakeFromPod() {
  const { podId } = useParams();
  const { fetchFromUser } = useFetch();
  const { allUsernames } = useData();
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
  const [usersOfThePod, setUsersOfThePod] = useState([]);
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
  // const [userListChanged, setUserListChanged] = useState(false);
  const [requestAmountValid, setRequestAmountValid] = useState(false);
  const inputRef = useRef(null);
  let userListChanged = false;

  function areListsEqual(a, b) {
    return a.sort().toString() == b.sort().toString();
  }

  let urlToGetPod = `pods/getThePod/${podId}`;

  //get the pod infos to take from it
  useEffect(() => {
    fetchFromUser("GET", urlToGetPod)
      .then((res) => res.json())
      .then((jsonData) => {
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

  useEffect(() => {
    setPod((prevPod) => ({ ...prevPod, usersOfThePod }));
    setAllUsersExceptUsersOfThePod(
      allUsernames.filter((a) => !usersOfThePod.includes(a))
    );
    // console.log({ pod });

    //   if (usersOfThePod.length > 0) {
    //     if (areListsEqual(usersOfThePod, initialValues.usersOfThePod)) {
    //       setUserListChanged(false);
    //     } else {
    //       setUserListChanged(true);
    //     }
    //   }
  }, [usersOfThePod]);

  if (usersOfThePod.length > 0) {
    userListChanged = !areListsEqual(
      usersOfThePod,
      initialValues.usersOfThePod
    );
  }

  // console.log(pod);

  // allUsers.map((u) => {
  //   if (!usersOfThePod.includes(u)) allUsersExceptUsersOfThePod.push(u);
  // });

  const url = "http://localhost:3500/pods";

  function handleUpdate(e) {
    e.preventDefault();
    setIsLoading(true);
    fetchFromUser("PATCH", "pods", pod)
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((jsonData) => {
        setServerMessage(jsonData.message);
      });
  }

  function handleChange(e) {
    setPod((prevPod) => ({
      ...prevPod,
      [e.target.name]: e.target.value,
    }));
  }

  function handleTake(e) {
    let askedValueToTake = e.target.value;
    if (
      askedValueToTake > 0 &&
      askedValueToTake <= initialValues.productRawAmount
    ) {
      setPod(initialValues);
      setRequestAmountValid(true);
      // let askedValueToTake = e.target.value;

      setPod((prevPod) => ({
        ...prevPod,
        productRawAmount: prevPod.productRawAmount - askedValueToTake,
        podTotalWeight: (
          prevPod.podTotalWeight -
          ((prevPod.podTotalWeight - prevPod.podFreeWeight) /
            prevPod.productRawAmount) *
            askedValueToTake
        ).toFixed(2),
      }));
    }
    if (askedValueToTake === "" || askedValueToTake <= 0) {
      e.target.value = null;
      setPod(initialValues);
      setRequestAmountValid(false);
    }

    if (askedValueToTake > initialValues.productRawAmount) {
      setRequestAmountValid(false);
    }
  }

  function handleReverse(e) {
    e.preventDefault();
    inputRef.current.value = null;
    setPod(initialValues);
    setUsersOfThePod(initialValues.usersOfThePod);
  }

  console.log({ requestAmountValid });
  console.log({ userListChanged });

  console.log(!requestAmountValid && !userListChanged);

  // useEffect(() => {
  //   setRemainingValueOnScale(pod.podTotalWeight);
  // }, [pod.podTotalWeight]);

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
            <label htmlFor="">Request Raw Product</label>
            <input
              autoComplete="off"
              onChange={handleTake}
              name="takeProductRawAmount"
              type="number"
              max={initialValues.productRawAmount}
              readOnly={serverMessage}
              ref={inputRef}
            />
          </div>
          <div className="createPodProp">
            <label htmlFor="">Remaining Value On Scale</label>
            <input
              // value={remainingValueOnScale}
              value={pod.podTotalWeight}
              placeholder="0"
              autoComplete="off"
              name="remainingValueOnScale"
              type="number"
              readOnly
            />
          </div>

          {isOwner && (
            <ShareUnshareWithUser
              allUsersExceptUsersOfThePod={allUsersExceptUsersOfThePod}
              setAllUsersExceptUsersOfThePod={setAllUsersExceptUsersOfThePod}
              usersOfThePod={usersOfThePod}
              setUsersOfThePod={setUsersOfThePod}
            />
          )}
          {isLoading && <RiLoaderFill />}
          <p style={{ color: "green" }}>{serverMessage}</p>
          <div className="buttons">
            <button
              // disabled={
              //   initialValues.productRawAmount === pod.productRawAmount ||
              //   serverMessage ||
              //   !requestAmountValid
              // }
              disabled={
                requestAmountValid == false
                  ? true
                  : !requestAmountValid && !userListChanged
              }
              onClick={handleUpdate}
              className="createPod--button"
            >
              {isOwner ? "Take/Update" : "Take"}
            </button>
            <ReverseButton
              anyChange={
                pod.podTotalWeight != initialValues.podTotalWeight ||
                pod.productRawAmount != initialValues.productRawAmount ||
                userListChanged
              }
              handleReverse={handleReverse}
            />
          </div>
        </div>
      </form>
    </main>
  );
}
