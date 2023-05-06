import { useEffect } from "react";

export default function Pod({
  creator,
  usersOfThePod,
  podName,
  PodFreeWeight,
  podTotalWeight,
  productRawAmount,
}) {
  return (
    <div className="pod">
      <div className="podName">
        <label htmlFor="">{podName}</label>
        <h3 className="podName--title">Pod Tavuk</h3>
      </div>
      <div className="podTare">
        <label htmlFor="">{PodFreeWeight}</label>
        <h3 className="podName--tare">200</h3>
      </div>
      <div className="podTotal">
        <label htmlFor="">{podTotalWeight}</label>
        <h3 className="podName--total">1000</h3>
      </div>
      <div className="podRaw">
        <label htmlFor="">{productRawAmount}</label>
        <h3 className="podName--raw">300</h3>
      </div>
    </div>
  );
}
