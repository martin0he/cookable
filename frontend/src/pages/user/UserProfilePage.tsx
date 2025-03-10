/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton, Typography } from "@mui/material";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";
import PageLayout from "../PageLayout";
import { useState } from "react";
import { IoIosSave } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
const UserProfilePage = () => {
  const { data: user } = useGetCurrentUser();
  const [isEditing, setIsEditing] = useState(false);
  const [userBio, setUserBio] = useState(user?.bio);
  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  // const [password, setPassword] = useState("");

  const UserDetailField = ({
    fieldTitle,
    fieldValue,
    fieldOnChange,
  }: {
    fieldTitle: string;
    fieldValue: string;
    fieldOnChange: (e: any) => void;
  }) => {
    return (
      <Box marginBottom="20px" width="100%">
        <Typography fontSize={{ lg: 34, md: 29, sm: 26, xs: 23 }}>
          {fieldTitle}:
        </Typography>
        <input
          type="text"
          value={fieldValue}
          onChange={fieldOnChange}
          placeholder={`Enter your ${fieldTitle.toLowerCase()} here`}
          style={{
            width: "100%",
            backgroundColor: "transparent",
            fontFamily: "inherit",
            fontSize: "20px",
            border: "none",
            outline: "none",
            color: "inherit",
          }}
        />
      </Box>
    );
  };

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserBio(e.target.value);
    // update in db here
  };

  return (
    <PageLayout>
      <Box
        width={{ lg: "95%", md: "70%", sm: "80%", xs: "90%" }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        columnGap="25px"
        rowGap="25px"
        position="relative"
      >
        {isEditing ? (
          <IconButton
            onChange={() => setIsEditing(false)}
            color="secondary"
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          >
            <IoIosSave />
          </IconButton>
        ) : (
          <IconButton
            onChange={() => setIsEditing(true)}
            color="secondary"
            sx={{
              position: "absolute",
              top: "10px",
              right: "10px",
            }}
          >
            <FaRegEdit />
          </IconButton>
        )}

        {/* profile pic + full name */}
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src={user?.profilePictureUrl ?? ""}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <Typography
            fontSize={{ lg: 36, md: 31, sm: 28, xs: 25 }}
            marginTop="10px"
          >
            {user?.firstName} {user?.lastName}
          </Typography>
        </Box>

        {/* bio + date joined */}

        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          flexWrap="wrap"
          //paddingX="30px"
        >
          <Typography height="100%" flexGrow={1}>
            <textarea
              name="bio"
              value={userBio || ""}
              onChange={handleBioChange}
              placeholder="Add a descriptive bio of yourself here; talk about your background, cultural ties to food, professional and/or personal cooking experience, etc..."
              style={{
                width: "100%",
                height: "40vh",
                backgroundColor: "transparent",
                fontFamily: "inherit",
                fontSize: "23px",
                border: "none",
                outline: "none",
                color: "inherit",
                resize: "none",
                overflow: "auto",
              }}
            />
          </Typography>
          <Typography sx={{ transform: "rotate(-90deg)", marginTop: "100px" }}>
            Joined: {user?.dateRegistered.toDateString()}
          </Typography>
        </Box>
        {/* username + email + password */}
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems={{
            lg: "flex-start",
            md: "center",
            sm: "center",
            xs: "center",
          }}
          justifyContent="flex-start"
          flexWrap="wrap"
        >
          <UserDetailField
            fieldTitle="Username"
            fieldValue={username || ""}
            fieldOnChange={(e) => setUsername(e.target.value)}
          />
          <UserDetailField
            fieldTitle="Email"
            fieldValue={email || ""}
            fieldOnChange={(e) => setEmail(e.target.value)}
          />
        </Box>
      </Box>
    </PageLayout>
  );
};

export default UserProfilePage;
