import OptionUser from "./OptionUser";

export default function SelectOfUsers({ users }) {
  return (
    <select name="" id="">
      {users.map((user) => (
        <OptionUser user={user} />
      ))}
    </select>
  );
}
