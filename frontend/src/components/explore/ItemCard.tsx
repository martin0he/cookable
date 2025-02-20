import { Box } from "@mui/system";
import { Cookbook, Recipe } from "../../types";
import { Chip, Typography } from "@mui/material";

interface ItemCardProps {
  data: Recipe | Cookbook;
  onClick: () => void;
}

const isRecipe = (data: Recipe | Cookbook): data is Recipe => {
  return (data as Recipe).tags !== undefined;
};

const ItemCard = ({ data, onClick }: ItemCardProps) => {
  return (
    <Box
      width="fit-content"
      minHeight="300px"
      onClick={onClick}
      padding="8px"
      display="flex"
      flexDirection="column"
      flexGrow={1}
      sx={{
        border: "2px",
        borderRadius: "8px",
        borderStyle: "dashed",
        borderColor: "text.main",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          borderStyle: "solid",
          cursor: "pointer",
          transform: "scale(1.02)",
        },
      }}
    >
      {/* Title */}
      <Typography fontSize={{ lg: 26, md: 22, sm: 28, xs: 28 }}>
        {data.title}
      </Typography>

      {/* Description */}
      <Typography
        width={{ lg: "15vw" }}
        marginTop="14px"
        height="12vh"
        overflow={"hidden"}
        textOverflow={"ellipsis"}
        fontSize={{ lg: 21, md: 17, sm: 23, xs: 23 }}
        sx={{
          flexGrow: 1,
        }}
      >
        {data.description}
      </Typography>

      {/* Tags and Image */}
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        flexDirection="row"
        alignItems="flex-end"
        sx={{
          marginTop: "auto",
        }}
      >
        <Box>
          {isRecipe(data) &&
            data.tags?.map((tag, index) => (
              <Chip
                sx={{
                  borderRadius: "6px",
                  margin: "3px",
                  backgroundColor: "#B7949285",
                }}
                key={index}
                label={tag}
              />
            ))}
        </Box>
        {isRecipe(data) && data.imageUrl && (
          <img
            src={data.imageUrl}
            alt={data.title}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        )}
        {!isRecipe(data) && (data as Cookbook).coverImageUrl && (
          <img
            src={(data as Cookbook).coverImageUrl as string}
            alt={data.title}
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default ItemCard;
