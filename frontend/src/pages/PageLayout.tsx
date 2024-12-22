import { Box } from "@mui/material";
import { ReactElement } from "react";
import Navbar from "../components/navigation/Navbar";

const PageLayout = ({ children }: { children: ReactElement }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      paddingX="50px"
      paddingTop="150px"
      height="calc(100vh - 50px)"
    >
      <Navbar />
      <Box
        flex="1"
        width="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;
