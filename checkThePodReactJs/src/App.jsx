import { Routes, Route } from "react-router-dom";
import Pods from "./components/Pods";
import Nav from "./components/Nav";
import Login from "./components/Login";
export default function App() {
  return (
    <section>
      <header>Check The Pods</header>
      <Nav />
      <Routes>
        <Route path="/" element={<Pods />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </section>
  );
}
