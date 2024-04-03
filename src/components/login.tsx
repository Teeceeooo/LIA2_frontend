import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getConfig } from "../interfaces/configInterface";

interface LoginFormProps {
  onLogin: () => void;
}

function LoginForm({ onLogin }: LoginFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const baseURL = `${getConfig().baseURL}`;
  const loginURL = `${baseURL}/api/v1/login`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.get(loginURL, {
        params: {
          username: username,
          password: password,
        },
      });

      if (response.data) {
        const { token } = response.data;
        console.log("Received token:", token);

        sessionStorage.setItem("token", token);

        onLogin();

        navigate("/");
      } else {
        alert("Login failed! Please check your credentials.");
      }
    } catch (error) {
      alert("Login failed! Please check your credentials.");
    }
  };

  return (
    <form id="login-form" className="login-container" onSubmit={handleSubmit}>
      <input
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
      />
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
