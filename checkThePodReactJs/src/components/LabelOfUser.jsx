import useAuth from "../hooks/useAuth";

export default function LabelOfUser({ user, removeFromPod }) {
  const { auth } = useAuth();

  return (
    <b className="userTag" onClick={(e) => removeFromPod(e.target.innerText)}>
      {auth.username === user ? `${user}(you)` : user}
    </b>
  );
}
