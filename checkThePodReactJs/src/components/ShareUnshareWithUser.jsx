import SelectOfUsers from "./SelectOfUsers";
import LabelOfUser from "./LabelOfUser";

export default function ShareUnshareWithUser({
  allUsersExceptUsersOfthePod,
  setAllUsersExceptUsersOfthePod,
  usersOfThePod,
  setUsersOfThePod,
}) {
  function removeFromPod(nameOfTheUser) {
    if (!nameOfTheUser.includes("you")) {
      setUsersOfThePod((prevList) =>
        prevList.filter((p) => p !== nameOfTheUser)
      );
      setAllUsersExceptUsersOfthePod((prevList) => [
        ...prevList,
        nameOfTheUser,
      ]);
    }
  }

  function addToPod(nameOfTheUser) {
    if (!nameOfTheUser.includes("you")) {
      setUsersOfThePod((prevList) => [...prevList, nameOfTheUser]);
      setAllUsersExceptUsersOfthePod((prevList) =>
        prevList.filter((p) => p !== nameOfTheUser)
      );
    }
  }

  return (
    <>
      <div className="createPodProp">
        <label htmlFor="">Share your pod with other users</label>
        {allUsersExceptUsersOfthePod.length !== 0 && (
          <SelectOfUsers
            users={allUsersExceptUsersOfthePod}
            addToPod={addToPod}
          />
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
