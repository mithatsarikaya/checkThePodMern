import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const url = "http://localhost:3500/";
  const navigate = useNavigate();

  const [passwordsMatched, setPasswordsMatched] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [anyError, setAnyError] = useState("");
  const [isCreated, setIsCreated] = useState(false);

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const checkPasswordMatch = (e) => {
    if (e.target.value.length > 4 && e.target.value === registerData.password) {
      setPasswordsMatched(true);
    } else {
      setPasswordsMatched(false);
    }
  };
  const handleChange = (e) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
    if (registerData.username.length > 3) {
      setIsUsernameValid(true);
    } else {
      setIsUsernameValid(false);
    }

    setAnyError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const responseWithoutJson = await fetch(url + "users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });
    const response = await responseWithoutJson.json();

    //if response okey send user to home page after 2 seconds, i should make them automatic login
    if (responseWithoutJson.ok) {
      setIsCreated(true);
      setTimeout(() => navigate("/"), 2000);
    } else {
      setIsCreated(false);
      setAnyError(response.message);
    }
  };

  return (
    <main>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          id=""
          required
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="password"
          name="password"
          id=""
          required
          placeholder="password"
          onChange={handleChange}
        />
        <input
          type="password"
          name="passwordConfirm"
          id=""
          required
          placeholder="password again"
          onChange={checkPasswordMatch}
        />
        <p
          style={{
            display: !anyError || isCreated ? "none" : "block",
            color: "red",
          }}
        >
          {anyError}
        </p>
        <p style={{ display: !isCreated ? "none" : "block", color: "green" }}>
          {`${registerData.username} created`}
        </p>
        <input
          disabled={!passwordsMatched || !isUsernameValid}
          className="form--button"
          type="submit"
          value="REGISTER"
        />
      </form>
    </main>
  );
}
