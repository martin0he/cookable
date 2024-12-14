import { Box } from "@mui/material";
import { ReactElement } from "react";
import Navbar from "../components/navigation/Navbar";

const PageLayout = ({ children }: { children: ReactElement }) => {
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      paddingX="30px"
    >
      <Navbar />
      <div>{children}</div>
    </Box>
  );
};

export default PageLayout;
