import { Box, Typography } from "@mui/material";
import PageLayout from "./PageLayout";
import { useState } from "react";

const ExplorePage = () => {
  const [searchInput, setSearchInput] = useState("");
  return (
    <PageLayout>
      <Box
        width={{ lg: "95%", md: "70%", sm: "80%", xs: "90%" }}
        display="flex"
        flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
        alignItems="flex-start"
        justifyContent="center"
        columnGap="25px"
        rowGap="25px"
      >
        {/* sticky filter bar */}
        <Box
          width={{ lg: "28%", md: "28%", sm: "100%", xs: "100%" }}
          minHeight="83vh"
          position="sticky"
          sx={{
            borderRadius: "7px",
            borderStyle: "dashed",
            borderColor: "primary.main",
            backgroundColor: "#F3EDDF",
            borderWidth: "2px",
          }}
        ></Box>
        {/* search + body */}
        <Box
          display="flex"
          width={{ lg: "72%", md: "72%", sm: "100%", xs: "100%" }}
          height="83vh"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          rowGap="25px"
          border={1}
        >
          {/* search bar */}
          <Box
            width="100%"
            display="flex"
            flexWrap="wrap"
            alignItems="center"
            sx={{
              border: "2px",
              borderColor: "text.primary",
              borderStyle: "dashed",
              borderRadius: "10px",
              padding: "10px",
              gap: "4px",
            }}
          >
            <Typography
              fontSize={{ lg: 17, md: 16, sm: 15, xs: 14 }}
              flex={1}
              flexDirection="row"
              display="flex"
              alignItems="center"
            >
              <input
                type="text"
                placeholder="search..."
                onChange={(e) => setSearchInput(e.target.value)}
                style={{
                  flex: "inherit",
                  border: "none",
                  outline: "none",
                  fontSize: "inherit",
                  fontFamily: "inherit",
                  backgroundColor: "transparent",
                  color: "inherit",
                  width: "100%",
                }}
              />
            </Typography>
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default ExplorePage;
