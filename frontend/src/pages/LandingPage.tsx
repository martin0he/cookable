import { Box, Typography } from "@mui/material";
import { useAuth } from "../AuthContext";
import NavButton from "../components/navigation/NavButton";

const SectionOne = () => {
  return (
    <Box
      height="90vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
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
      height="90vh"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      gap={{ lg: "100px", md: "75px", sm: "50px", xs: "25px" }}
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
      <NavButton label={"continue"} route={"/bookcase"} />
    </Box>
  );
};

export default LandingPage;
