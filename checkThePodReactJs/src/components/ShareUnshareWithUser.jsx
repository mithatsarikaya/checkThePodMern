import SelectOfUsers from "./SelectOfUsers";
import LabelOfUser from "./LabelOfUser";

export default function ShareUnshareWithUser({
  allUsersExceptUsersOfThePod,
  setAllUsersExceptUsersOfThePod,
  usersOfThePod,
  setUsersOfThePod,
}) {
  function removeFromPod(nameOfTheUser) {
    if (!nameOfTheUser.includes("you")) {
      setUsersOfThePod((prevList) =>
        prevList.filter((p) => p !== nameOfTheUser)
      );
      setAllUsersExceptUsersOfThePod((prevList) => [
        ...prevList,
        nameOfTheUser,
      ]);
    }
  }

  function addToPod(nameOfTheUser) {
    if (!nameOfTheUser.includes("you")) {
      setUsersOfThePod((prevList) => [...prevList, nameOfTheUser]);
      setAllUsersExceptUsersOfThePod((prevList) =>
        prevList.filter((p) => p !== nameOfTheUser)
      );
    }
  }

  return (
    <>
      {allUsersExceptUsersOfThePod && (
        <div className="createPodProp share">
          <label htmlFor="">Share your pod with others</label>
          {allUsersExceptUsersOfThePod.length !== 0 && (
            <SelectOfUsers
              users={allUsersExceptUsersOfThePod}
              addToPod={addToPod}
            />
          )}
        </div>
      )}
      <div className="usersOfThePodLabels">
        {usersOfThePod.map((u, key) => (
          <LabelOfUser key={key} user={u} removeFromPod={removeFromPod} />
        ))}
      </div>
    </>
  );
}
