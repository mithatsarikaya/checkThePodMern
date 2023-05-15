import { Routes, Route } from "react-router-dom";
import AllPods from "./components/AllPods";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePod from "./components/CreatePod";
import UpdatePod from "./components/UpdatePod";
import MyPods from "./components/MyPods";
import RequireAuth from "./components/RequireAuth";
import TakeFromPod from "./components/TakeFromPod";
import PutToPod from "./components/PutToPod";

export default function App() {
  return (
    <section>
      <Nav />
      <Routes>
        <Route path="/" element={<AllPods />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<RequireAuth />}>
          <Route path="/createPod" element={<CreatePod />} />
          <Route path="/updatePod" element={<UpdatePod />} />
          <Route path="/myPods" element={<MyPods />} />
          <Route path="/myPods/take/:podId" element={<TakeFromPod />} />
          <Route path="/myPods/put/:podId" element={<PutToPod />} />
        </Route>
      </Routes>
    </section>
  );
}
