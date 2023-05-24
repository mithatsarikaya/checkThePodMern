import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Nav() {
  const { auth, setAuth } = useAuth();

  const username = auth?.username;

  function handleLogout() {
    setAuth({});
  }
  return (
    <>
      <header>Check The Pods</header>
      {username && <h1>Welcome {username}</h1>}
      <nav>
        <ul>
          <Link tabIndex={1} to="/">
            <li>HOME</li>
          </Link>
          <Link tabIndex={4} to="/about">
            <li>About</li>
          </Link>
          {username ? (
            <>
              <Link tabIndex={3} to="/createPod">
                <li>Create Pod</li>
              </Link>
              <Link to="/myPods">
                <li>My PODS</li>
              </Link>
              <Link onClick={handleLogout} tabIndex={2} to="/login">
                <li>LOGOUT</li>
              </Link>
            </>
          ) : (
            <Link tabIndex={2} to="/login">
              <li>LOGIN</li>
            </Link>
          )}
        </ul>
      </nav>
    </>
  );
}
