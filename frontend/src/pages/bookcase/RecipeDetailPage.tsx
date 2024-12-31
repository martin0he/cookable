import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "../PageLayout";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { MdArrowBack, MdExpandMore } from "react-icons/md";
import { FaClock } from "react-icons/fa6";
import { useGetRecipe } from "../../hooks/useGetRecipe";
import { useGetAllRecipesInCookbook } from "../../hooks/useGetAllRecipesInCookbook";

const RecipeDetailPage = () => {
  const { id } = useParams();
  const { data: recipe } = useGetRecipe(parseInt(id ?? ""));
  const { data: allRecipes } = useGetAllRecipesInCookbook(
    recipe?.cookbookId ?? 1
  );

  const nav = useNavigate();

  const currentIndex = allRecipes?.findIndex(
    (r) => r.id === parseInt(id ?? "")
  );

  // Get the previous and next recipes
  const previousRecipe =
    currentIndex !== undefined && allRecipes && currentIndex > 0
      ? allRecipes[currentIndex - 1]
      : null;

  const nextRecipe =
    currentIndex !== undefined &&
    allRecipes &&
    currentIndex < (allRecipes?.length ?? 0) - 1
      ? allRecipes[currentIndex + 1]
      : null;

  const firstThreeTags = recipe?.tags?.slice(0, 3);
  return (
    <PageLayout>
      <Box
        width={{ lg: "65%", md: "70%", sm: "80%", xs: "90%" }}
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        rowGap="8px"
      >
        {/* back to cookbook */}
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <IconButton
            sx={{
              padding: "4px 7px",
              borderRadius: "7px",
              border: 1.7,
              borderColor: "secondary.dark",
              borderStyle: "dashed",
            }}
            onClick={() => nav(`/bookcase/cookbook/${recipe?.cookbookId}`)}
          >
            <MdArrowBack />
          </IconButton>
        </Box>
        {/* title and tags */}
        <Box
          width="100%"
          display="flex"
          flexDirection={{
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          }}
          gap="7px"
          justifyContent={{
            lg: "space-between",
            md: "space-between",
            sm: "flex-start",
            xs: "flex-start",
          }}
          alignItems={{
            lg: "center",
            md: "center",
            sm: "flex-start",
            xs: "flex-start",
          }}
        >
          {/* title */}
          <Typography fontSize={{ lg: 33, md: 29, sm: 25, xs: 23 }}>
            {recipe?.title}
          </Typography>
          {/* tags */}
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            rowGap="10px"
          >
            {firstThreeTags?.map((tag: string) => (
              <Chip
                key={tag}
                sx={{ borderRadius: "10px", marginRight: "5px", padding: 0 }}
                label={
                  <Typography fontSize={{ lg: 15, md: 14, sm: 13, xs: 12 }}>
                    {tag}
                  </Typography>
                }
              />
            ))}
            {recipe?.tags && recipe?.tags?.length > 3 && (
              <Tooltip title={recipe.tags.join(", ")} arrow>
                <Chip
                  sx={{ borderRadius: "10px", marginX: "3px" }}
                  label={
                    <Typography fontSize={{ lg: 13, md: 12, sm: 11, xs: 10 }}>
                      ...
                    </Typography>
                  }
                />
              </Tooltip>
            )}
          </Box>
        </Box>
        {/* cover image */}
        {recipe && recipe.imageUrl && (
          <img
            src={recipe.imageUrl}
            alt="cover"
            style={{
              width: "100%",
              contain: "cover",
              borderRadius: "7px",
              height: "auto",
              marginTop: "10px",
            }}
          />
        )}
        {/* description and date */}
        <Box
          marginTop="15px"
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="flex-start"
          padding="10px 0"
        >
          {/* Description */}
          <Typography
            fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}
            sx={{
              flex: "1",
              wordWrap: "break-word",
              maxWidth: "75%",
              "&::first-letter": {
                fontSize: { lg: 26, md: 24, sm: 22, xs: 20 },
              },
            }}
          >
            {recipe?.description}
          </Typography>

          {/* Date */}
          <Typography fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}>
            {recipe?.datePublished.toDateString()}
          </Typography>
        </Box>
        {/* ingredients */}
        <Box width="100%" marginTop="15px">
          <Typography fontSize={{ lg: 30, md: 27, sm: 24, xs: 20 }} mb={2}>
            Ingredients
          </Typography>

          <Typography fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}>
            {recipe?.ingredients?.join(", ")}
          </Typography>
        </Box>

        {/* instructions */}
        <Box width="100%" marginTop="15px">
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize={{ lg: 30, md: 27, sm: 24, xs: 20 }} mb={2}>
              Instructions
            </Typography>
            <Typography
              fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}
              display="flex"
              alignItems="flex-start"
              flexDirection="row"
              columnGap="10px"
              height="wrap-content"
            >
              <FaClock />
              {recipe?.expectedDuration} minutes
            </Typography>
          </Box>

          {recipe?.instructions?.map((instruction, index) => (
            <Accordion
              sx={{
                marginBottom: "10px",
                border: 1.7,
                borderStyle: "dashed",
                borderColor: "primary.dark",
                backgroundColor: "background.default",
                boxShadow: 0,
                borderRadius: "7px",
              }}
              key={index}
            >
              <AccordionSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography
                  fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}
                  component="span"
                >
                  {index + 1}. {instruction.summary}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography fontSize={{ lg: 18, md: 16, sm: 14, xs: 13 }}>
                  {instruction.details}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        {/* pagination to next/prev recipes */}
        <Box
          width="100%"
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginTop="40px"
        >
          {/* Previous Recipe */}
          <Box flex="1" textAlign="left">
            {previousRecipe ? (
              <Typography
                onClick={() => nav(`/bookcase/recipe/${previousRecipe.id}`)}
                fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Previous Recipe: {previousRecipe.title}
              </Typography>
            ) : (
              <Box />
            )}
          </Box>

          {/* Next Recipe */}
          <Box flex="1" textAlign="right">
            {nextRecipe ? (
              <Typography
                onClick={() => nav(`/bookcase/recipe/${nextRecipe.id}`)}
                fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}
                sx={{ textDecoration: "underline", cursor: "pointer" }}
              >
                Next Recipe: {nextRecipe.title}
              </Typography>
            ) : (
              <Box />
            )}
          </Box>
        </Box>
      </Box>
    </PageLayout>
  );
};

export default RecipeDetailPage;
