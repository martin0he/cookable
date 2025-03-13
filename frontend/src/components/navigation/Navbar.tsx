import {
  Avatar,
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
import { useAuth } from "../../AuthContext";

const Navbar = ({ isLandingPage }: { isLandingPage?: boolean }) => {
  const [opacity, setOpacity] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const isLessThanMd = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuth();

  // set background color opacity to 0.75 when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setOpacity(0.65);
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
        backgroundColor: `rgba(254, 250, 240, ${isLandingPage ? 0 : opacity})`,
        backdropFilter: `blur(10px)`,
        WebkitBackdropFilter: `blur(10px)`,
        zIndex: 500,
      }}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <Typography variant="h5" sx={{ color: "secondary.dark" }}>
          cookable
        </Typography>
      </Link>
      {isLessThanMd ? (
        <IconButton onClick={() => setIsOpen(true)}>
          {" "}
          <Avatar
            sx={{
              width: 43,
              height: 43,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={
                user?.profilePictureUrl ??
                "https://picsum.photos/id/237/200/300"
              }
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          </Avatar>
        </IconButton>
      ) : (
        <Box display="flex" flexDirection="row" gap="20px" alignItems="center">
          <NavButton label="about" route="/about" />
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
                {["about", "bookcase", "trending", "explore"].map(
                  (text, index) => (
                    <ListItem key={index} disablePadding>
                      <NavButton label={text} route={`/${text}`} />
                    </ListItem>
                  )
                )}
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
