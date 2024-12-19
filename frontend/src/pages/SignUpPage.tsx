import { useState } from "react";
import { useAuth } from "../AuthContext";
import PageLayout from "./PageLayout";
import { Box, Button, TextField, Typography } from "@mui/material";
import { additionalColors } from "../theme";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const { isAuthenticated, register } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const nav = useNavigate();

  const handleRegister = async () => {
    register(username, firstName, lastName, email, password);
    nav("/about");
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
          borderWidth: 2.2,
          borderColor: "primary.main",
        }}
      >
        <Typography marginY="25px" variant="h2" fontSize={36}>
          Sign Up
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          gap={3}
          width="90%"
          justifyContent="center"
          alignItems="center"
        >
          <Box display="flex" flexDirection="row" gap="15px" width="100%">
            <TextField
              label="first name"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              sx={{ backgroundColor: additionalColors.inputBg }}
            />
            <TextField
              label="last name"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              sx={{ backgroundColor: additionalColors.inputBg }}
            />
          </Box>
          <TextField
            label="username"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            sx={{ backgroundColor: additionalColors.inputBg }}
          />
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
            onClick={handleRegister}
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

export default SignUp;
