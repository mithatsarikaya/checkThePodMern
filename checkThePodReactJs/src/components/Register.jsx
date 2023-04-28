import { useState } from "react";

export default function Register() {
  const [passwordsMatched, setPasswordsMatched] = useState(false);
  const [isReadySubmit, setIsReadySubmit] = useState(false);

  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
  });

  const checkPasswordMatch = (e) => {
    if (e.target.value.length > 4 && e.target.value === registerData.password) {
      setPasswordsMatched(true);
    }
  };

  const handleChange = (e) => {
    setRegisterData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(registerData);
  console.log(passwordsMatched);

  return (
    <main>
      <form action="">
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
          placeholder="confirm the password"
          onChange={checkPasswordMatch}
        />
        <input
          disabled={!passwordsMatched && !isReadySubmit}
          className="form--button"
          type="submit"
          value="REGISTER"
        />
      </form>
    </main>
  );
}
