import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PageLayout from "./PageLayout";
import { useState } from "react";

const ExplorePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [dataType, setDataType] = useState("recipe");
  const [chronology, setChronology] = useState("newest");

  const handleDataTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    newType: string
  ) => {
    setDataType(newType);
  };

  const handleChronologyChange = (
    event: React.MouseEvent<HTMLElement>,
    newChronology: string
  ) => {
    setChronology(newChronology);
  };

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
          padding="20px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          rowGap="12px"
          sx={{
            borderRadius: "7px",
            borderStyle: "dashed",
            borderColor: "primary.main",
            backgroundColor: "#F3EDDF",
            borderWidth: "2px",
          }}
        >
          {/* toggle recipe/cookbook */}
          <ToggleButtonGroup
            value={dataType}
            exclusive
            fullWidth
            onChange={handleDataTypeChange}
            aria-label="Platform"
            sx={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            <ToggleButton
              value="recipe"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor:
                  dataType === "recipe" ? "primary.dark" : "transparent",
                border: "1.8px",
                borderStyle: dataType === "recipe" ? "solid" : "dashed",
                borderColor: "primary.dark",
                "&.Mui-selected": {
                  backgroundColor: "primary.dark",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              }}
            >
              <Typography
                color={dataType === "recipe" ? "white" : "primary.dark"}
              >
                recipe
              </Typography>
            </ToggleButton>
            <ToggleButton
              value="cookbook"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor:
                  dataType === "cookbook" ? "primary.dark" : "transparent",
                border: "1.8px",
                borderStyle: dataType === "cookbook" ? "solid" : "dashed",
                borderColor: "primary.dark",
                "&.Mui-selected": {
                  backgroundColor: "primary.dark",
                  "&:hover": {
                    backgroundColor: "primary.dark",
                  },
                },
              }}
            >
              <Typography
                color={dataType === "cookbook" ? "white" : "primary.dark"}
              >
                cookbook
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
          {/* toggle chronology */}
          <ToggleButtonGroup
            value={chronology}
            exclusive
            fullWidth
            onChange={handleChronologyChange}
            aria-label="Platform"
            sx={{
              width: "100%",
              justifyContent: "center",
            }}
          >
            <ToggleButton
              value="newest"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor:
                  chronology === "newest" ? "secondary.dark" : "transparent",
                border: "1.8px",
                borderStyle: chronology === "newest" ? "solid" : "dashed",
                borderColor: "secondary.dark",
                "&.Mui-selected": {
                  backgroundColor: "secondary.dark",
                  "&:hover": {
                    backgroundColor: "secondary.dark",
                  },
                },
              }}
            >
              <Typography
                color={chronology === "newest" ? "white" : "secondary.dark"}
              >
                newest
              </Typography>
            </ToggleButton>
            <ToggleButton
              value="oldest"
              sx={{
                borderRadius: "8px",
                textTransform: "none",
                backgroundColor:
                  chronology === "oldest" ? "secondary.dark" : "transparent",
                border: "1.8px",
                borderStyle: chronology === "oldest" ? "solid" : "dashed",
                borderColor: "secondary.dark",
                "&.Mui-selected": {
                  backgroundColor: "secondary.dark",
                  "&:hover": {
                    backgroundColor: "secondary.dark",
                  },
                },
              }}
            >
              <Typography
                color={chronology === "oldest" ? "white" : "secondary.dark"}
              >
                oldest
              </Typography>
            </ToggleButton>
          </ToggleButtonGroup>
          {/* expected duration slider */}
        </Box>
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
