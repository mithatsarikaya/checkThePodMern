export default function CreatePod() {
  return (
    <main>
      <div className="createPod">
        <div className="createPodProp">
          <label htmlFor="">Pod Name</label>
          <input type="text" required />
        </div>
        <div className="createPodProp">
          <label htmlFor="">Pod Tare</label>
          <input type="number" required />
        </div>
        <div className="createPodProp">
          <label htmlFor="">Pod Total</label>
          <input type="number" />
        </div>
        <div className="createPodProp">
          <label htmlFor="">Pod Raw Product</label>
          <input type="number" />
        </div>
        <button className="createPod--button">Create</button>
      </div>
    </main>
  );
}
