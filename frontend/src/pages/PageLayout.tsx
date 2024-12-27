import { Box } from "@mui/material";
import { ReactElement } from "react";
import Navbar from "../components/navigation/Navbar";

const PageLayout = ({ children }: { children: ReactElement }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      minHeight="100vh"
      paddingBottom="30px"
    >
      <Navbar />
      <Box
        flex="1"
        width="90%"
        minHeight="80vh"
        marginTop="90px"
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="center"
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;
