import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import NavButton from "./NavButton";
import AvatarMenu from "./Avatar";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [opacity, setOpacity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isLessThanMd = useMediaQuery(theme.breakpoints.down("md"));

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
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography variant="h5" sx={{ color: "secondary.dark" }}>
          cookable
        </Typography>
      </Link>
      {isLessThanMd ? (
        <IconButton onClick={() => setIsOpen(true)}>h</IconButton>
      ) : (
        <Box display="flex" flexDirection="row" gap="20px" alignItems="center">
          <NavButton label="bookcase" route="/bookcase" />
          <NavButton label="trending" route="/trending" />
          <NavButton label="explore" route="/explore" />
          <AvatarMenu />
        </Box>
      )}
      {isLessThanMd && (
        <Drawer anchor="right" open={isOpen} onClose={() => setIsOpen(false)}>
          <Box
            onClick={() => setIsOpen(false)}
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              paddingY: "10px",
              paddingX: "20px",
            }}
          >
            <Box>
              <List>
                {["bookcase", "trending", "explore"].map((text, index) => (
                  <ListItem key={index} disablePadding>
                    <NavButton label={text} route={`/${text}`} />
                  </ListItem>
                ))}
              </List>
              <Divider />
            </Box>

            <Box>
              <ListItem disablePadding>
                <AvatarMenu />
              </ListItem>
            </Box>
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default Navbar;
