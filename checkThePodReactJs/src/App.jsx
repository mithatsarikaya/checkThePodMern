import { Routes, Route } from "react-router-dom";
import AllPods from "./components/AllPods";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePod from "./components/CreatePod";
import UpdatePod from "./components/UpdatePod";
import RequireAuth from "./components/RequireAuth";

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
        </Route>
      </Routes>
    </section>
  );
}
