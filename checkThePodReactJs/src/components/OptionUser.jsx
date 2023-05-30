export default function OptionUser({ user }) {
  return (
    <option onClick={(e) => console.log(e)} value={user}>
      {user}
    </option>
  );
}
