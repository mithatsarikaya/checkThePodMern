import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import jwt_decode from "jwt-decode";
import useAuth from "../hooks/useAuth";
import { RiLoaderFill } from "react-icons/ri";

export default function Login() {
  const navigate = useNavigate();
  const url = "http://localhost:3500/";
  const { auth, setAuth } = useAuth();
  const [anyError, setAnyError] = useState("");

  const [loginInfos, setLoginInfos] = useState({ username: "", password: "" });

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  const handleChange = (e) => {
    setLoginInfos((prevInfos) => ({
      ...prevInfos,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    setAnyError("");
    e.preventDefault();
    let response = setTimeout(async () => {
      await fetch(`${url}auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfos),
      });
    }, 1500);

    if (!response.ok) {
      let errMsg = await response.json();
      console.log();
      setAnyError(errMsg.message);
    } else {
      let token = await response.json();
      var decoded = jwt_decode(token.accessToken);
      setAuth(decoded.UserInfo);
    }
  };

  const sendUserToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <main>
      <form action="" onSubmit={handleLogin}>
        <input
          ref={userRef}
          onChange={handleChange}
          type="text"
          name="username"
          id=""
          required
          placeholder="username"
        />
        <input
          // tabIndex={1}
          onChange={handleChange}
          type="password"
          name="password"
          id=""
          required
          placeholder="password"
        />

        {anyError ? (
          <p style={{ color: "red" }}>{anyError}</p>
        ) : (
          <RiLoaderFill />
        )}
        {/* <RiLoaderFill />
        <p
          style={{
            display: !anyError ? "none" : "block",
            color: "red",
          }}
        >
          {anyError}
        </p> */}
        <input
          // tabIndex={2}
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
