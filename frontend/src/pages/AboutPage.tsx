import { Box, Typography } from "@mui/material";
import PageLayout from "./PageLayout";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const AboutPage = () => {
  return (
    <PageLayout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        width="100%"
        marginTop={5}
        sx={{ overflowX: "hidden" }}
      >
        {/* Main Title */}
        <Box
          width="60%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            alignSelf="flex-start"
            fontSize={{ lg: 45, md: 40, sm: 35, xs: 30 }}
          >
            about
          </Typography>
          <img
            src="about-title.png"
            alt="about-title"
            style={{ width: "100%", contain: "cover" }}
          />
          <Typography
            alignSelf="flex-end"
            fontSize={{ lg: 45, md: 40, sm: 35, xs: 30 }}
          >
            cookable
          </Typography>
        </Box>
        {/* Section 1 */}
        <Box
          data-aos="fade-right"
          data-aos-duration="1500"
          display="flex"
          flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
          width="90%"
          justifyContent="center"
          alignItems="center"
          gap="6px"
          columnGap="90px"
          marginTop="150px"
        >
          <Box width={{ lg: "70%", md: "90%", sm: "50%", xs: "50%" }}>
            <img src="about-1.png" alt="about-1" style={{ width: "100%" }} />
          </Box>
          <Typography
            width={{ lg: "90%", md: "95%", sm: "100%", xs: "100%" }}
            fontSize={{ lg: 25, md: 20, sm: 17, xs: 15 }}
          >
            <span style={{ fontStyle: "italic" }}>cookable</span> is designed to
            empower home cooks to innovate, save, and share their recipes with
            the world, and especially their friends. Shorten the gap between
            your kitchen and people’s plates.
          </Typography>
        </Box>
        {/* Section 2 */}
        <Box
          data-aos="fade-left"
          data-aos-duration="1500"
          display="flex"
          flexDirection={{
            lg: "row-reverse",
            md: "row-reverse",
            sm: "column",
            xs: "column",
          }}
          width="90%"
          justifyContent="center"
          alignItems="center"
          gap="6px"
          columnGap="90px"
          marginTop="150px"
          marginBottom="40px"
        >
          <Box width={{ lg: "70%", md: "90%", sm: "50%", xs: "50%" }}>
            <img src="about-2.png" alt="about-1" style={{ width: "100%" }} />
          </Box>
          <Typography
            width={{ lg: "90%", md: "95%", sm: "100%", xs: "100%" }}
            fontSize={{ lg: 25, md: 20, sm: 17, xs: 15 }}
          >
            This is where food and friendships come together. Share recipes,
            connect with friends, and discover trending dishes from a global
            community. Explore, create, and enjoy food together!
          </Typography>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default AboutPage;
