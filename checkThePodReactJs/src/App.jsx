export default function App() {
  return (
    <section>
      <header>Check The Pod</header>
      <nav>
        <ul>
          <li>HOME</li>
          <li>LOGIN</li>
        </ul>
      </nav>
      <main>
        <div className="pod">
          <div className="podName">
            <label htmlFor="">Pod Name</label>
            <h2 className="podName--title">Pod Tavuk</h2>
          </div>
          <div className="podTare">
            <label htmlFor="">Pod Tare</label>
            <h2 className="podName--tare">200</h2>
          </div>
          <div className="podTotal">
            <label htmlFor="">Pod Total</label>
            <h2 className="podName--total">1000</h2>
          </div>
          <div className="podRaw">
            <label htmlFor="">Raw Product</label>
            <h2 className="podName--raw">300</h2>
          </div>
        </div>
        <div className="pod">
          <div className="podName">
            <label htmlFor="">Pod Name</label>
            <h2 className="podName--title">Pod Pilav</h2>
          </div>
          <div className="podTare">
            <label htmlFor="">Pod Tare</label>
            <h2 className="podName--tare">300</h2>
          </div>
          <div className="podTotal">
            <label htmlFor="">Pod Total</label>
            <h2 className="podName--total">1200</h2>
          </div>
          <div className="podRaw">
            <label htmlFor="">Raw Product</label>
            <h2 className="podName--raw">400</h2>
          </div>
        </div>
      </main>
    </section>
  );
}
