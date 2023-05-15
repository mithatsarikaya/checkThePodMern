import SelectOfUsers from "./SelectOfUsers";
import LabelOfUser from "./LabelOfUser";

export default function ShareUnshareWithUser({
  allUsersExceptUser,
  usersOfThePod,
  setUsersOfThePod,
}) {
  function removeFromPod(nameOfTheUser) {
    setUsersOfThePod((prevPod) => prevPod.filter((p) => p !== nameOfTheUser));
  }

  function addToPod(nameOfTheUser) {
    setUsersOfThePod((prevPod) => [...prevPod, nameOfTheUser]);
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
