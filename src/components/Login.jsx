import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleUsernameChange = event => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  let handleSubmit = async e => {
    e.preventDefault();
    let response = await fetch(
      `http://localhost:8080/user/login?email=${userName}&password=${password}`,
      {
        method: "POST",
        mode: "cors",
      }
    );
    let data = await response.json();
    console.log(data);
    if (data.data.useRole === "MANAGER") {
      sessionStorage.setItem("manager", JSON.stringify(data.data));
      window.location.assign("/admin");
    } else if (data.data.useRole === "EMPLOYEE") {
      sessionStorage.setItem("employee", JSON.stringify(data.data));
      window.location.assign("/trainee");
    } else {
      console.log("error");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="username"
          placeholder="Username"
          value={userName}
          onChange={handleUsernameChange}
          required
        />
        <br />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <br />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
