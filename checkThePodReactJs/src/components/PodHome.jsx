import useAuth from "../hooks/useAuth";

export default function PodHome({
  podId,
  creatorId,
  usersOfThePod,
  podName,
  podFreeWeight,
  podTotalWeight,
  productRawAmount,
  creatorUsername,
  handleDeletePod,
}) {
  const { auth } = useAuth();

  let onlineUsername = auth?.username;

  return (
    <div className="pod">
      <div className="podName">
        <label htmlFor="">Pod Name</label>
        <h3 className="podName--title">{podName}</h3>
      </div>
      <div className="podName">
        <label htmlFor="">Pod Creator</label>
        <h3 className="podName--title">
          {creatorUsername === onlineUsername
            ? `${creatorUsername}(you)`
            : creatorUsername}
        </h3>
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
    </div>
  );
}
