import { Typography, useTheme } from "@mui/material";
import { NavLink } from "react-router-dom";

interface NavButtonProps {
  label: string;
  route: string;
}

const NavButton = ({ label, route }: NavButtonProps) => {
  const theme = useTheme();

  return (
    <NavLink
      to={route}
      style={{
        textDecoration: "none",
      }}
    >
      {({ isActive }) => (
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.secondary.dark,
            textDecoration: isActive ? "underline" : "none",
            textDecorationColor: isActive
              ? theme.palette.secondary.dark
              : "transparent",
            transition: "text-decoration-color 0.3s ease",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          {label}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavButton;
