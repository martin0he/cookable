import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";

const Login = () => {
  const { login, logout, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      console.log("Login response:", response.data);
      login(email, password);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <div>
      {isAuthenticated ? <h1>Logged in</h1> : <h1>Not logged in</h1>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleLogout}>log out</button>
    </div>
  );
};

export default Login;
