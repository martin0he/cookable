import { Box, Typography } from "@mui/material";
import { Cookbook } from "../../types";
import { useGetAllRecipesInCookbook } from "../../hooks/useGetAllRecipesInCookbook";

interface CookbookCardProps {
  cookbook: Cookbook;
  onClick: (id: number) => void;
}

const CookbookCard = ({ cookbook, onClick }: CookbookCardProps) => {
  const mainColor = "#E4C7C5";
  const shade1 = "#D4B0AE";
  const shade2 = "#C4A099";
  const { data: recipes } = useGetAllRecipesInCookbook(cookbook.id);

  return (
    <Box
      position="relative"
      width="185px"
      height="220px"
      margin="9px"
      onClick={() => onClick(cookbook.id)}
      sx={{
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <Box
        position="absolute"
        top="10px"
        left="10px"
        width="185px"
        height="220px"
        borderRadius="3px"
        sx={{ backgroundColor: shade2 }}
      />

      <Box
        position="absolute"
        top="5px"
        left="5px"
        width="185px"
        height="220px"
        borderRadius="3px"
        sx={{ backgroundColor: shade1 }}
      />

      <Box
        position="relative"
        borderRadius="3px"
        width="185px"
        height="220px"
        padding="10px"
        sx={{ backgroundColor: mainColor, overflow: "hidden" }}
      >
        <Typography>{cookbook.title}</Typography>
        <Typography>
          {recipes && recipes?.length > 1
            ? `${recipes?.length} recipes`
            : recipes && recipes?.length === 0
            ? "No recipes"
            : `${recipes?.length} recipe`}
        </Typography>
      </Box>
    </Box>
  );
};

export default CookbookCard;
