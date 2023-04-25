import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
        <Link tabIndex={1} to="/">
          <li>HOME</li>
        </Link>
        <Link tabIndex={2} to="/login">
          <li>LOGIN</li>
        </Link>
        <li>CREATE</li>
      </ul>
    </nav>
  );
}
