import OptionUser from "./OptionUser";

export default function SelectOfUsers({ users, addToPod }) {
  return (
    <select onClick={(e) => addToPod(e.target.value)} name="" id="">
      {users.map((user) => (
        <OptionUser user={user} />
      ))}
    </select>
  );
}
