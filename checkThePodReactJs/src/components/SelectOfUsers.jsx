import OptionUser from "./OptionUser";

export default function SelectOfUsers({ users, addToPod }) {
  return (
    <select onChange={(e) => addToPod(e.target.value)} name="" id="">
      {users.map((user) => (
        <OptionUser user={user} />
      ))}
    </select>
  );
}
