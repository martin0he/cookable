import { Box, TextField, Typography } from "@mui/material";
import PageLayout from "../PageLayout";
import { useGetCurrentUser } from "../../hooks/useGetCurrentUser";

const UserProfilePage = () => {
  const { data: user } = useGetCurrentUser();
  if (!user) {
    return null;
  }
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
          value={user.bio || ""}
          placeholder="Write a short bio about yourself..."
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
              value={user.firstName || ""}
              placeholder="First Name"
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
              value={user.lastName || ""}
              placeholder="Last Name"
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
              value={user.username || ""}
              placeholder="Username"
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
              value={user.email || ""}
              placeholder="Email"
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
