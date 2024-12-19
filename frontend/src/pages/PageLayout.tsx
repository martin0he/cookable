import { Box } from "@mui/material";
import { ReactElement } from "react";
import Navbar from "../components/navigation/Navbar";

const PageLayout = ({ children }: { children: ReactElement }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingX="50px"
      paddingTop="150px"
      height="100vh"
    >
      <Navbar />
      {children}
    </Box>
  );
};

export default PageLayout;
