import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import PageLayout from "./PageLayout";
import { Box, Button, TextField, Typography } from "@mui/material";
import { additionalColors } from "../theme";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });
      console.log("Login response:", response.data);
      login(email, password);
      nav("/about");
    } catch (error) {
      console.error("Login error:", error);
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
        <Typography marginY="25px" variant="h2" fontSize={36}>
          Sign In
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          width="90%"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            type="email"
            label="email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            sx={{ backgroundColor: additionalColors.inputBg }}
          />
          <TextField
            type="password"
            label="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            sx={{ backgroundColor: additionalColors.inputBg }}
          />
          <Button
            onClick={handleLogin}
            sx={{
              width: "fit-content",
              backgroundColor: "primary.main",
              color: "white",
              textTransform: "lowercase",
              padding: "5px 25px",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
          >
            enter
          </Button>
        </Box>

        {isAuthenticated ? <p>Authenticated</p> : <p>Not authenticated</p>}
      </Box>
    </PageLayout>
  );
};

export default Login;
