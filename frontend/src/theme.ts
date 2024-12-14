import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#667761",
      dark: "#545E56",
    },
    secondary: {
      main: "#B79492",
      dark: "#917C78",
    },
    background: {
      default: "#FFFAF0",
      paper: "#ffffff",
    },
    text: {
      primary: "#403D3D",
    },
  },
  typography: {
    fontFamily: "Special Elite",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;
