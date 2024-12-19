import { Box, Typography } from "@mui/material";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import CustomButton from "../components/general/CustomButton";

const SectionOne = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <img
        src="landing.jpg"
        alt="landing"
        width="100%"
        height="100%"
        style={{
          opacity: 0.2,
          position: "absolute",
          zIndex: -1,
          backdropFilter: "blur(20px)",
          top: 0,
          objectFit: "cover",
        }}
      />
      <Typography
        fontSize={{ xs: 50, sm: 70, md: 90, lg: 110 }}
        color="secondary.dark"
      >
        cookable
      </Typography>
    </Box>
  );
};

const SectionTwo = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
      justifyContent="center"
      alignItems="center"
      gap={{ lg: "100px", md: "75px", sm: "100px", xs: "125px" }}
    >
      {/* box 1 */}
      <Box>
        <Typography fontSize={{ lg: 25, md: 21, sm: 18, xs: 15 }}>
          Author{" "}
          <Typography
            component="span"
            fontSize={{ lg: 35, md: 28, sm: 24, xs: 20 }}
            fontWeight="550"
          >
            your own
          </Typography>{" "}
          cookbook
        </Typography>

        <Typography
          fontSize={{ lg: 25, md: 21, sm: 18, xs: 15 }}
          marginLeft="-20px"
        >
          Share your{" "}
          <Typography
            component="span"
            fontSize={{ lg: 35, md: 28, sm: 24, xs: 20 }}
            fontWeight="550"
          >
            unique recipes
          </Typography>
        </Typography>
        <Typography
          fontSize={{ lg: 25, md: 21, sm: 18, xs: 15 }}
          marginLeft="12px"
        >
          See what the rest of the world
        </Typography>
        <Typography
          fontSize={{ lg: 25, md: 21, sm: 18, xs: 15 }}
          marginLeft="3px"
        >
          is
          <Typography
            component="span"
            fontSize={{ lg: 35, md: 28, sm: 24, xs: 20 }}
            fontWeight="550"
          >
            {" "}
            cooking up
          </Typography>
        </Typography>
      </Box>
      {/* box 2 */}
      <Box>
        <Typography fontSize={{ lg: 25, md: 21, sm: 18, xs: 15 }}>
          Favorite your{" "}
          <Typography
            component="span"
            fontSize={{ lg: 35, md: 28, sm: 24, xs: 20 }}
            fontWeight="550"
          >
            friends' dishes
          </Typography>
        </Typography>
        <Typography
          fontSize={{ lg: 25, md: 21, sm: 18, xs: 15 }}
          marginLeft="-24px"
        >
          Check out{" "}
          <Typography
            component="span"
            fontSize={{ lg: 35, md: 28, sm: 24, xs: 20 }}
            fontWeight="550"
          >
            trending plates
          </Typography>
        </Typography>
        <Typography
          fontSize={{ lg: 25, md: 21, sm: 18, xs: 15 }}
          marginLeft="-11px"
        >
          Expand your palette
        </Typography>
        <Typography
          fontSize={{ lg: 25, md: 21, sm: 18, xs: 15 }}
          marginLeft="10px"
        >
          discover what's{" "}
          <Typography
            component="span"
            fontSize={{ lg: 35, md: 28, sm: 24, xs: 20 }}
            fontWeight="550"
          >
            cookable
          </Typography>
        </Typography>
      </Box>
    </Box>
  );
};

const SectionThree = () => {
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
      justifyContent="center"
      alignItems="center"
      gap={{ lg: "100px", md: "75px", sm: "50px", xs: "25px" }}
    >
      <Box width={{ lg: "35%", md: "35%", sm: "80%", xs: "80%" }}>
        <img src="sketchbook.png" alt="sketchbook" width="100%" />
      </Box>

      <Box
        width={{ lg: "35%", md: "35%", sm: "80%", xs: "80%" }}
        display="flex"
        flexDirection="column"
        gap="20px"
      >
        <Typography fontSize={{ lg: 25, md: 21, sm: 18, xs: 15 }}>
          Catalog and save your favorite recipes. Keep them close wherever you
          are and spread your creativity. Have fun with it...
        </Typography>
        <Typography fontSize={{ lg: 23, md: 20, sm: 17, xs: 14 }}>
          “The way you make an omelet reveals your character.”
        </Typography>
        <Typography fontSize={{ lg: 21, md: 28, sm: 15, xs: 12 }}>
          - Anthony Bourdain (1956-2018)
        </Typography>
      </Box>
    </Box>
  );
};

const ContinueButton = () => {
  const nav = useNavigate();
  return (
    <Box
      position="fixed"
      bottom="30px"
      right={{ lg: "30px", md: "30px", sm: "20px", xs: "20px" }}
    >
      <CustomButton
        text="continue"
        fontSize={20}
        onClick={() => nav("/about")}
      />
    </Box>
  );
};

const LandingPage = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <Box display="flex" flexDirection="column" width="100%">
      {/* Section 1 */}
      <SectionOne />
      {/* Section 2 */}
      <SectionTwo />
      {/* Section 3 */}
      <SectionThree />
      <ContinueButton />
    </Box>
  );
};

export default LandingPage;
