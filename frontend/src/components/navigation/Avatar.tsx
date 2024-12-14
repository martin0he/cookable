import {
  Box,
  Tooltip,
  IconButton,
  Menu,
  MenuItem,
  Divider,
  Avatar,
  Typography,
} from "@mui/material";
import React from "react";
import { useAuth } from "../../AuthContext";
import { useNavigate } from "react-router-dom";

const AvatarMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { isAuthenticated, logout, user } = useAuth();
  const nav = useNavigate();

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              sx={{
                width: 43,
                height: 43,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {isAuthenticated && user ? (
                <img
                  style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                  src={
                    user.profilePictureUrl ??
                    "https://picsum.photos/id/237/200/300"
                  }
                />
              ) : (
                "g"
              )}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {isAuthenticated ? (
          <>
            <MenuItem onClick={() => nav("/profile")}>
              <Typography>profile</Typography>
            </MenuItem>
            <MenuItem onClick={() => nav("/friends")}>
              <Typography>friends</Typography>
            </MenuItem>
            <MenuItem onClick={() => nav("/settings")}>
              <Typography>settings</Typography>
            </MenuItem>
            <Divider />
            <MenuItem onClick={() => logout()}>
              <Typography>logout</Typography>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem onClick={() => nav("/login")}>
              <Typography>sign in</Typography>
            </MenuItem>
            <MenuItem onClick={() => nav("/signup")}>
              <Typography>sign up</Typography>
            </MenuItem>
          </>
        )}
      </Menu>
    </>
  );
};

export default AvatarMenu;
