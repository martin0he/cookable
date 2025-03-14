import { Box, IconButton, TextField, Typography } from "@mui/material";
import PageLayout from "../PageLayout";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoIosSave } from "react-icons/io";

const UserProfilePage = () => {
  const { data: user } = useGetCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [userBio, setUserBio] = useState(user && user.bio);
  const [userFirstName, setUserFirstName] = useState(user && user.firstName);
  const [userLastName, setUserLastName] = useState(user && user.lastName);
  const [userUsername, setUserUsername] = useState(user && user.username);
  const [userEmail, setUserEmail] = useState(user && user.email);

  if (!user) {
    return null;
  }

  const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserBio(event.target.value);
  };
  const handleFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserFirstName(event.target.value);
  };
  const handleLastNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserLastName(event.target.value);
  };
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserUsername(event.target.value);
  };
  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.target.value);
  };
  const handleSaveChanges = () => {
    console.log("Saving changes...");
    setIsEditing(true);
  };

  const ToggleButton = () => {
    return isEditing ? (
      <IconButton
        onClick={() => setIsEditing(false)}
        color="primary"
        sx={{ position: "absolute", bottom: 30, right: 30 }}
      >
        <FaEdit />
      </IconButton>
    ) : (
      <IconButton
        onClick={handleSaveChanges}
        color="primary"
        sx={{ position: "absolute", bottom: 30, right: 30 }}
      >
        <IoIosSave />
      </IconButton>
    );
  };

  return (
    <PageLayout>
      <Box
        width={{ lg: "95%", md: "70%", sm: "80%", xs: "90%" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        columnGap="25px"
        rowGap="45px"
      >
        {/* toggle editing state */}
        <ToggleButton />
        {/* avatar and name */}
        <Box display="flex" flexDirection="column" alignItems="center">
          {/* avatar */}
          <img
            src={user.profilePictureUrl || "/default-avatar.png"}
            alt={`${user.firstName} ${user.lastName}`}
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
          />
          {/* name */}
          <Typography variant="h5" sx={{ mt: 2 }}>
            {`${user.firstName} ${user.lastName}`}
          </Typography>
        </Box>
        {/* bio */}

        <TextField
          disabled={isEditing}
          value={userBio || ""}
          placeholder="Write a short bio about yourself..."
          onChange={handleBioChange}
          multiline
          minRows={4}
          fullWidth
          variant="standard"
          InputProps={{
            sx: {
              borderRadius: "8px",
              padding: "10px",
              backgroundColor: "transparent",
              fontFamily: "inherit",
              fontSize: "1rem",
              border: "2px dashed #B79492",
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                border: "2px solid #B79492",
                transform: "scale(1.005)",
                transition: "all 0.3s ease-in-out",
              },
            },
            disableUnderline: true,
          }}
        />

        {/* first name + last name, username, email */}
        <Box
          display="flex"
          flexDirection="column"
          width="fitr-content"
          alignSelf="flex-start"
          rowGap="20px"
          columnGap="20px"
          sx={{
            borderRadius: "8px",
            paddingY: "28px",
            paddingX: "20px",
            backgroundColor: "transparent",
            fontFamily: "inherit",
            fontSize: "1rem",
            border: "2px dashed #B79492",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              border: "2px solid #B79492",
              transform: "scale(1.005)",
              transition: "all 0.3s ease-in-out",
            },
          }}
        >
          {/* first name and last */}
          <Box
            display="flex"
            flexDirection={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            flexWrap="wrap"
            alignItems="center"
            columnGap="20px"
            rowGap="20px"
          >
            <TextField
              disabled={isEditing}
              value={userFirstName || ""}
              placeholder="First Name"
              onChange={handleFirstNameChange}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  backgroundColor: "#e0cdcc",
                  padding: "10px",
                  borderRadius: "6px",
                },
              }}
            />
            <TextField
              disabled={isEditing}
              value={userLastName || ""}
              placeholder="Last Name"
              onChange={handleLastNameChange}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  backgroundColor: "#e0cdcc",
                  padding: "10px",
                  borderRadius: "6px",
                },
              }}
            />
          </Box>
          {/* username and email */}
          <Box
            display="flex"
            flexDirection={{ lg: "row", md: "row", sm: "row", xs: "column" }}
            flexWrap="wrap"
            alignItems="center"
            columnGap="20px"
            rowGap="20px"
          >
            <TextField
              disabled={isEditing}
              value={userUsername || ""}
              placeholder="Username"
              onChange={handleUsernameChange}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  backgroundColor: "#e0cdcc",
                  padding: "10px",
                  borderRadius: "6px",
                },
              }}
            />
            <TextField
              disabled={isEditing}
              value={userEmail || ""}
              placeholder="Email"
              onChange={handleEmailChange}
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: {
                  backgroundColor: "#e0cdcc",
                  padding: "10px",
                  borderRadius: "6px",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default UserProfilePage;
