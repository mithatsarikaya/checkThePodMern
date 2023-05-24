import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { RiLoaderFill } from "react-icons/ri";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";

export default function Login() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [anyError, setAnyError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [areInputsValid, setAreInputsValid] = useState(false);

  const [loginInfos, setLoginInfos] = useState({ username: "", password: "" });
  const url = "http://localhost:3500/";

  const userRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    let username = loginInfos.username;
    let password = loginInfos.password;

    if (username.length > 3 && password.length > 3) {
      setAreInputsValid(true);
    } else {
      setAreInputsValid(false);
    }
  }, [loginInfos.username, loginInfos.password]);

  const handleChange = (e) => {
    setLoginInfos((prevInfos) => ({
      ...prevInfos,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setAnyError("");
    let response = await fetch(`${url}auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginInfos),
    });

    if (!response.ok) {
      let errMsg = await response.json();
      setAnyError(errMsg.message);
    } else {
      let responseJson = await response.json();
      let token = responseJson.accessToken;
      var decoded = jwt_decode(token);
      setAuth({ ...decoded.UserInfo, token });
      setSuccess(responseJson.message);

      //if user manages to login then send him to main page
      setTimeout(() => navigate("/"), 1500);
    }
  };

  // useEffect(()=>{
  //   if(success){

  //   }
  // }, [success])

  const sendUserToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <main>
      <form className="from--login-register" action="" onSubmit={handleLogin}>
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
          onChange={handleChange}
          type="password"
          name="password"
          id=""
          required
          placeholder="password"
        />

        {anyError || success ? (
          <p style={{ color: "red" }}>{anyError}</p>
        ) : isLoading ? (
          <RiLoaderFill />
        ) : null}
        {success && !anyError && <p style={{ color: "green" }}>{success}</p>}
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
          className="form--button"
          type="submit"
          disabled={success || !areInputsValid}
          value="LOGIN"
        />
        <input
          className="form--button"
          onClick={sendUserToRegisterPage}
          type="button"
          disabled={success}
          value="REGISTER"
        />
      </form>
    </main>
  );
}
