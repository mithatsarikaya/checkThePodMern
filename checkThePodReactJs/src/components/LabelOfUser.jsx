export default function LabelOfUser({ user, removeFromPod }) {
  return (
    <b className="userTag" onClick={(e) => removeFromPod(e.target.innerText)}>
      {user}
    </b>
  );
}
