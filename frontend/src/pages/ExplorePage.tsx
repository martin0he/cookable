import {
  Box,
  Button,
  Chip,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import PageLayout from "./PageLayout";
import { useState } from "react";
import { useGetAllRecipes } from "../hooks/getAllRecipes";

const ExplorePage = () => {
  // fetching data

  // gather all recipes and find the lowest and highest expected duration
  const { data: allRecipes } = useGetAllRecipes();

  const allDurations = allRecipes
    ?.map((recipe) => recipe.expectedDuration)
    .filter((duration): duration is number => duration !== null);
  const minimumExpectedDuration =
    allDurations && allDurations.length > 1 ? Math.min(...allDurations) : 0;
  const maximumExpectedDuration =
    allDurations && allDurations.length > 1 ? Math.max(...allDurations) : 180;

  // gather all existing tags
  const allTagLists = allRecipes
    ?.map((recipe) => recipe.tags)
    .filter((tags): tags is string[] => tags !== null);
  // remove duplicates and flatten array
  const allTags = allTagLists?.reduce((acc, tags) => {
    tags.forEach((tag) => {
      if (!acc.includes(tag)) {
        acc.push(tag);
      }
    });
    return acc;
  }, [] as string[]);

  // state variables
  const [searchInput, setSearchInput] = useState("");
  const [dataType, setDataType] = useState("recipe");
  const [chronology, setChronology] = useState("newest");
  const [expectedDuration, setExpectedDuration] = useState(
    minimumExpectedDuration
  );
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

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

  const handleDurationChange = (event: Event, newValue: number | number[]) => {
    setExpectedDuration(newValue as number);
  };

  const handleTagToggle = (event: React.MouseEvent<HTMLElement>) => {
    const tag = event.currentTarget.textContent;
    if (selectedTags.includes(tag as string)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      if (tag) {
        setSelectedTags([...selectedTags, tag]);
      }
    }
  };
  console.log(selectedTags);

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
          <Box
            marginY="15px"
            display="flex"
            flexDirection="column"
            width="100%"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography fontSize={{ lg: 18, md: 16, sm: 16, xs: 20 }}>
              Expected Duration
            </Typography>
            <Slider
              aria-label="Volume"
              valueLabelDisplay="auto"
              min={minimumExpectedDuration}
              max={maximumExpectedDuration}
              value={expectedDuration}
              onChange={handleDurationChange}
              sx={{ width: "97%" }}
            />
          </Box>
          {/* tags select */}
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            justifyContent="center"
            alignItems="flex-start"
          >
            <Typography fontSize={{ lg: 18, md: 16, sm: 16, xs: 20 }}>
              Tags
            </Typography>
            <Box width="100%">
              {allTags?.map((tag) => (
                <Button
                  key={tag}
                  onClick={handleTagToggle}
                  sx={{
                    padding: 0,
                    width: "fit-content",
                    borderRadius: "8px",
                    margin: "4px",
                  }}
                >
                  <Chip
                    key={tag}
                    label={tag}
                    sx={{
                      borderRadius: "inherit",
                      textTransform: "none",
                      border: "1.8px",
                      borderStyle: "dashed",
                      borderColor: "primary.main",
                      backgroundColor: selectedTags.includes(tag)
                        ? "primary.main"
                        : "transparent",
                      color: selectedTags.includes(tag)
                        ? "white"
                        : "primary.main",
                    }}
                  />
                </Button>
              ))}
            </Box>
          </Box>
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
