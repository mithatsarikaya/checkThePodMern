import { useState } from "react";
import useFetch from "../hooks/useFetch";
import useLoginLogout from "../hooks/useLoginLogout";
import { RiLoaderFill } from "react-icons/ri";

export default function Register() {
  const { fetchPublic } = useFetch();
  const { handleLoginAfterRegistration } = useLoginLogout();

  const [passwordsMatched, setPasswordsMatched] = useState(false);
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [anyError, setAnyError] = useState("");
  const [isCreated, setIsCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const response = await fetchPublic("POST", "users", registerData);
    const jsonData = await response.json();

    //if response okey send user to home page after 2 seconds, i should make them automatic login
    if (response.ok) {
      setIsCreated(true);
      // setTimeout(() => navigate("/"), 2000);
      setTimeout(() => setIsLoading(false), 1850);
      setTimeout(
        () =>
          handleLoginAfterRegistration(
            registerData.username,
            registerData.password
          ),
        2000
      );
    } else {
      setIsCreated(false);
      setAnyError(jsonData.message);
    }
  };

  return (
    <main>
      <form className="from--login-register" action="" onSubmit={handleSubmit}>
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
          {`${registerData.username} created, You are sending to homepage`}
        </p>
        {isLoading && <RiLoaderFill />}
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
