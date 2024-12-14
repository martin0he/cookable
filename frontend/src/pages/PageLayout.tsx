import { Box } from "@mui/material";
import { ReactElement } from "react";
import Navbar from "../components/navigation/Navbar";

const PageLayout = ({ children }: { children: ReactElement }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingX="30px"
      paddingTop="150px"
    >
      <Navbar />
      {children}
    </Box>
  );
};

export default PageLayout;
