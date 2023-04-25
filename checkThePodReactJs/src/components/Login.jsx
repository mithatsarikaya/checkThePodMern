import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const sendUserToRegisterPage = () => {
    navigate("/register");
  };
  return (
    <main>
      <form action="">
        <input type="email" name="" id="" required placeholder="email" />
        <input type="password" name="" id="" required placeholder="password" />
        <input className="form--button" type="submit" value="LOGIN" />
        <input
          className="form--button"
          onClick={sendUserToRegisterPage}
          type="button"
          value="REGISTER"
        />
      </form>
    </main>
  );
}
