import { GrRevert } from "react-icons/gr";

export default function ReverseButton({ anyChange, handleReverse }) {
  return (
    <button
      disabled={anyChange}
      onClick={(e) => {
        handleReverse(e);
      }}
      className="createPod--button"
    >
      Reverse
      <GrRevert />
    </button>
  );
}
