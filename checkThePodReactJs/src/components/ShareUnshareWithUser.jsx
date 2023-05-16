import SelectOfUsers from "./SelectOfUsers";
import LabelOfUser from "./LabelOfUser";

export default function ShareUnshareWithUser({
  allUsersExceptUser,
  setAllUsersExceptUser,
  usersOfThePod,
  setUsersOfThePod,
}) {
  function removeFromPod(nameOfTheUser) {
    if (!nameOfTheUser.includes("you")) {
      setUsersOfThePod((prevList) =>
        prevList.filter((p) => p !== nameOfTheUser)
      );
      setAllUsersExceptUser((prevList) => [...prevList, nameOfTheUser]);
    }
  }

  function addToPod(nameOfTheUser) {
    if (!nameOfTheUser.includes("you")) {
      setUsersOfThePod((prevList) => [...prevList, nameOfTheUser]);
      setAllUsersExceptUser((prevList) =>
        prevList.filter((p) => p !== nameOfTheUser)
      );
    }
  }

  return (
    <>
      <div className="createPodProp">
        <label htmlFor="">Share your pod with other users</label>
        {allUsersExceptUser.length !== 0 && (
          <SelectOfUsers users={allUsersExceptUser} addToPod={addToPod} />
        )}
      </div>
      <div className="usersOfThePodLabels">
        {usersOfThePod.map((u) => (
          <LabelOfUser user={u} removeFromPod={removeFromPod} />
        ))}
      </div>
    </>
  );
}
