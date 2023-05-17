import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";
import ShareUnshareWithUser from "./ShareUnshareWithUser";

//users of the page : owner of the pod and users that add by the owner

export default function TakeFromPod() {
  const { fetchFromUser } = useFetch();
  const { allUsernames } = useData();
  const { auth } = useAuth();
  const [usersOfThePod, setUsersOfThePod] = useState([]);
  const [allUsersExceptUsersOfThePod, setAllUsersExceptUsersOfThePod] =
    useState([]);
  const [isOwner, setIsOwner] = useState(false);
  const [pod, setPod] = useState({
    creatorId: "",
    usersOfThePod: usersOfThePod,
    podName: "",
    podFreeWeight: 0,
    podTotalWeight: 0,
    productRawAmount: 0,
  });

  const { podId } = useParams();

  let urlToGetPod = `pods/getThePod/${podId}`;
  let urlToGetUsers = `users`;

  console.log({ takefrompod: allUsersExceptUsersOfThePod });

  //get the pod infos to take from it
  useEffect(() => {
    fetchFromUser("GET", urlToGetPod)
      .then((res) => res.json())
      .then((jsonData) => {
        console.log({ podData: jsonData });
        setIsOwner(auth.id === jsonData.creatorId);
        setUsersOfThePod(jsonData.usersOfThePod.map((u) => u.username));
        setAllUsersExceptUsersOfThePod(
          allUsernames.filter((a) => !usersOfThePod.includes(a))
        );
      });
  }, []);

  // console.log(pod);

  const user = auth.username;
  const allUsers = allUsernames;

  // allUsers.map((u) => {
  //   if (!usersOfThePod.includes(u)) allUsersExceptUsersOfThePod.push(u);
  // });

  const url = "http://localhost:3500/pods";

  function postTheData() {}

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

  return (
    <main>
      {podId}
      <form className="form--create-update" action="">
        <div className="createPod">
          <div className="createPodProp">
            <label htmlFor="">Pod Name</label>
            <input
              autoComplete="off"
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
              autoComplete="off"
              onChange={handleChange}
              name="podTotalWeight"
              type="number"
            />
          </div>
          <div className="createPodProp">
            <label htmlFor="">Pod Raw Product</label>
            <input
              autoComplete="off"
              onChange={handleChange}
              name="productRawAmount"
              type="number"
            />
          </div>

          {/* <div>
            {"allUsersExceptUsersOfThePod:" + allUsersExceptUsersOfThePod}
          </div>
          <div>{"podUsers: " + usersOfThePod}</div>
          <div>{"isOwner: " + isOwner}</div> */}

          <ShareUnshareWithUser
            allUsersExceptUsersOfThePod={allUsersExceptUsersOfThePod}
            setAllUsersExceptUsersOfThePod={setAllUsersExceptUsersOfThePod}
            usersOfThePod={usersOfThePod}
            setUsersOfThePod={setUsersOfThePod}
          />
          <div className="buttons">
            <button onClick={handleSubmit} className="createPod--button">
              Take
            </button>
            {/* <button onClick={handleSubmit} className="createPod--button">
              Put
            </button> */}
            <button onClick={handleSubmit} className="createPod--button">
              Reset
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}
