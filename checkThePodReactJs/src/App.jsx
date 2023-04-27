import { Routes, Route } from "react-router-dom";
import Pods from "./components/Pods";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Register from "./components/Register";
import CreatePod from "./components/CreatePod";
import UpdatePod from "./components/UpdatePod";

export default function App() {
  return (
    <section>
      <header>Check The Pods</header>
      <Nav />
      <Routes>
        <Route path="/" element={<Pods />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/createPod" element={<CreatePod />} />
        <Route path="/updatePod" element={<UpdatePod />} />
      </Routes>
    </section>
  );
}
