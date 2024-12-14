import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import PageLayout from "./PageLayout";
import { Box } from "@mui/material";
import { additionalColors } from "../theme";

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
    <PageLayout>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        width={{ xs: "95%", sm: "75%", md: "50%" }}
        height="fit-content"
        padding="25px"
        sx={{
          backgroundColor: additionalColors.darkBg,
          borderRadius: 2,
          border: 1,
          borderStyle: "dashed",
          borderWidth: 1.8,
          borderColor: "primary.main",
        }}
      >
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
        {isAuthenticated ? <p>Authenticated</p> : <p>Not authenticated</p>}
      </Box>
    </PageLayout>
  );
};

export default Login;
