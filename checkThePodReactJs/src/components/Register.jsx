import { useState } from "react";

export default function Register() {
  const url = "http://localhost:3500/";
  const [passwordsMatched, setPasswordsMatched] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);

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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(url + "users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });
    console.log(await response.json());
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
