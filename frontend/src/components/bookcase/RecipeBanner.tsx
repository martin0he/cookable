import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { Recipe } from "../../types";
import { MdAccessTime } from "react-icons/md";
import { IoAddCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface RecipeBannerProps {
  recipe?: Recipe;
}

const RecipeBanner = ({ recipe }: RecipeBannerProps) => {
  const ingredients = recipe?.ingredients?.split(",");
  const firstThreeIngredients = ingredients?.slice(0, 3);
  const nav = useNavigate();

  return recipe ? (
    <Box
      onClick={() => nav(`/bookcase/recipe/${recipe.id}`)}
      width="100%"
      marginY="10px"
      display="flex"
      flexDirection="column"
      rowGap="10px"
      height="fit-content"
      paddingX="20px"
      paddingY="15px"
      position="relative"
      sx={{
        borderRadius: "7px",
        border: 1.6,
        borderColor: "primary.main",
        borderStyle: "dashed",
        cursor: "pointer",
        "&:hover": {
          borderStyle: "solid",
        },
      }}
    >
      {/* Title and ingredients */}
      <Box
        display="flex"
        width="100%"
        justifyContent="space-between"
        flexDirection={{
          xs: "column-reverse",
          sm: "column-reverse",
          md: "row",
        }}
        alignContent="center"
        gap="10px"
      >
        <Typography variant="h5">{recipe.title}</Typography>
        <Box width="fit-content">
          {firstThreeIngredients?.map((ingredient) => (
            <Chip
              sx={{ borderRadius: "10px", marginRight: "5px" }}
              label={ingredient.toLowerCase()}
            />
          ))}
          {ingredients && ingredients.length > 3 && (
            <Tooltip title={ingredients.join(", ")} arrow>
              <Chip sx={{ borderRadius: "10px", marginX: "3px" }} label="..." />
            </Tooltip>
          )}
        </Box>
      </Box>
      {/* Description */}
      <Typography maxWidth={{ lg: "70%", md: "70%", sm: "80%", xs: "85%" }}>
        {recipe.description}
      </Typography>
      {/* Duration */}
      <Box
        display="flex"
        flexDirection="row"
        width="fit-content"
        height="fit-content"
        gap="7px"
        position="absolute"
        bottom="10px"
        right="10px"
      >
        <MdAccessTime />
        <Typography>{recipe.expectedDuration}</Typography>
      </Box>
    </Box>
  ) : (
    <Box
      width="100%"
      marginY="10px"
      display="flex"
      flexDirection="column"
      height="fit-content"
      sx={{
        borderRadius: "7px",
        border: 1.6,
        borderColor: "primary.main",
        borderStyle: "dashed",
      }}
    >
      <IconButton
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "7px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          paddingY: "20px",
        }}
      >
        <IoAddCircle fontSize={40} />
        <Typography variant="h5">create recipe</Typography>
      </IconButton>
    </Box>
  );
};

export default RecipeBanner;
