import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";

export default function Pod({
  podId,
  creatorId,
  usersOfThePod,
  podName,
  podFreeWeight,
  podTotalWeight,
  productRawAmount,
  handleDeletePod,
}) {
  const { auth } = useContext(AuthContext);
  let isOwner = auth.id === creatorId;
  let creatorName = usersOfThePod.filter((u) => u._id === creatorId)[0]
    .username;
  console.log({ creatorName });

  let usersOfThePodExceptCreatorNames = usersOfThePod
    .filter((u) => {
      if (u._id !== creatorId) {
        return u.username;
      }
    })
    .map((i) => i.username);

  return (
    <div className="pod">
      <div className="podName">
        <label htmlFor="">Pod Name</label>
        <h3 className="podName--title">{podName}</h3>
      </div>
      <div className="podTare">
        <label htmlFor="">Pod Tare</label>
        <h3 className="podName--tare">{podFreeWeight}</h3>
      </div>
      <div className="podTotal">
        <label htmlFor="">Pod Total</label>
        <h3 className="podName--total">{podTotalWeight}</h3>
      </div>
      <div className="podRaw">
        <label htmlFor="">Raw Product</label>
        <h3 className="podName--raw">{productRawAmount}</h3>
      </div>
      <div className="creatorNameOfThePod">
        <label htmlFor="">Creator</label>
        <h3 className="podName--raw">{creatorName}</h3>
      </div>
      <div className="usersOfThePod">
        <label htmlFor="">Shared with</label>
        {usersOfThePodExceptCreatorNames.map((u) => (
          <h3 className="podName--raw">{u}</h3>
        ))}
      </div>

      <div className="buttons">
        <button className="createPod--button">Take</button>
        <button className="createPod--button">Put</button>
        <button className="createPod--button">Reset</button>
        {isOwner && (
          <button
            onClick={() => handleDeletePod(podId)}
            className="createPod--button"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
