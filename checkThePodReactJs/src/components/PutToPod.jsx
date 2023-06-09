import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import { RiLoaderFill } from "react-icons/ri";
import ShareUnshareWithUser from "./ShareUnshareWithUser";
import ReverseButton from "./ReverseButton";
import UpdateUserListButton from "./UpdateUserListButton";
//users of the page : owner of the pod and users that add by the owner

export default function PutToPod() {
  const { podId } = useParams();
  const { fetchFromUser } = useFetch();
  const { allUsernames } = useData();
  const { auth } = useAuth();
  const [usersOfThePod, setUsersOfThePod] = useState([]);
  const [allUsersExceptUsersOfThePod, setAllUsersExceptUsersOfThePod] =
    useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState("");
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

  let userListChanged = false;

  useEffect(() => {
    setPod((prevPod) => ({ ...prevPod, usersOfThePod }));
    setAllUsersExceptUsersOfThePod(
      allUsernames.filter((a) => !usersOfThePod.includes(a))
    );
    // console.log({ pod });
  }, [usersOfThePod]);

  let urlToGetPod = `pods/getThePod/${podId}`;

  //get the pod infos to take from it
  useEffect(() => {
    fetchFromUser("GET", urlToGetPod)
      .then((res) => res.json())
      .then((jsonData) => {
        // console.log({ podData: jsonData });
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

  function deleteTheFirstZeroAtTheBeginning(number) {
    if (number.length > 1 && number[0] == 0) {
      let modifiedNumber = number.substring(1);
      return modifiedNumber;
    }
    return number;
  }

  function handleUpdate(e) {
    setIsLoading(true);
    e.preventDefault();
    fetchFromUser("PATCH", "pods", pod)
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((jsonData) => {
        setServerMessage(jsonData.message);
        console.log(jsonData);
      });
  }

  function handleChange(e) {
    let amount = e.target.value;

    amount = deleteTheFirstZeroAtTheBeginning(amount);

    console.log(amount);

    if (amount >= 0) {
      setPod((prevPod) => ({
        ...prevPod,
        [e.target.name]: amount,
      }));
    } else if (amount < 0) {
      amount = null;
    }
  }

  function handleReverse(e) {
    e.preventDefault();
    setPod(initialValues);
    setUsersOfThePod(initialValues.usersOfThePod);
  }

  function areListsEqual(a, b) {
    return a.sort().toString() == b.sort().toString();
  }

  if (usersOfThePod.length > 0) {
    userListChanged = !areListsEqual(
      usersOfThePod,
      initialValues.usersOfThePod
    );
    console.log({ userListChanged });
  }

  let reverseBtnDisabled =
    pod.podTotalWeight != initialValues.podTotalWeight ||
    pod.productRawAmount != initialValues.productRawAmount ||
    serverMessage;

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
              disabled={
                !(
                  pod.podTotalWeight != initialValues.podTotalWeight ||
                  pod.productRawAmount != initialValues.productRawAmount
                ) || serverMessage
              }
              onClick={handleUpdate}
              className="createPod--button"
            >
              Put
            </button>
            {isOwner && (
              <UpdateUserListButton
                pod={pod}
                setIsLoading={setIsLoading}
                setServerMessage={setServerMessage}
                anyChange={userListChanged}
              />
            )}

            <ReverseButton
              anyChange={reverseBtnDisabled || serverMessage}
              handleReverse={handleReverse}
            />
          </div>
        </div>
      </form>
    </main>
  );
}
