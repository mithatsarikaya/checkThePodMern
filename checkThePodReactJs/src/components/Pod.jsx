import { useEffect, useContext } from "react";
import AuthContext from "../context/AuthProvider";

export default function Pod({
  podId,
  creator,
  usersOfThePod,
  podName,
  podFreeWeight,
  podTotalWeight,
  productRawAmount,
  handleDeletePod,
}) {
  const { auth } = useContext(AuthContext);

  let isOwner = auth.id === creator;

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
