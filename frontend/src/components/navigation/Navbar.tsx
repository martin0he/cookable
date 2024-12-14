import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NavButton from "./NavButton";

const Navbar = () => {
  const [opacity, setOpacity] = useState(1);

  // set background color opacity to 0.75 when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setOpacity(0.75);
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      width="100%"
      height="70px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      padding="20px"
      position="fixed"
      top="0"
      sx={{
        backgroundColor: `rgba(255, 250, 240, ${opacity})`,
        backdropFilter: `blur(10px)`,
        zIndex: 1000,
      }}
    >
      <Typography variant="h5" sx={{ color: "secondary.dark" }}>
        cookable
      </Typography>
      <Box display="flex" flexDirection="row" gap="20px">
        <NavButton label="bookcase" route="/bookcase" />
        <NavButton label="trending" route="/trending" />
        <NavButton label="explore" route="/explore" />
      </Box>
    </Box>
  );
};

export default Navbar;
