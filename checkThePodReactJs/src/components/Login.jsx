import { useNavigate } from "react-router-dom";
import { useState } from "react";
import jwt_decode from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();
  const url = "http://localhost:3500/";

  const [loginInfos, setLoginInfos] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setLoginInfos((prevInfos) => ({
      ...prevInfos,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    let response = await fetch(`${url}auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfos),
    });
    let token = await response.json();
    var decoded = jwt_decode(token.accessToken);
    console.log(decoded);
  };

  const sendUserToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <main>
      <form action="" onSubmit={handleLogin}>
        <input
          tabIndex={1}
          onChange={handleChange}
          type="text"
          name="username"
          id=""
          required
          placeholder="username"
        />
        <input
          tabIndex={2}
          onChange={handleChange}
          type="password"
          name="password"
          id=""
          required
          placeholder="password"
        />
        <input
          tabIndex={3}
          className="form--button"
          type="submit"
          value="LOGIN"
        />
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
