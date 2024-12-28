import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import PageLayout from "../PageLayout";
import { useGetCookbook } from "../../hooks/useGetCookbook";
import { useGetUser } from "../../hooks/useGetUser";
import { useGetAllRecipesInCookbook } from "../../hooks/useGetAllRecipesInCookbook";
import RecipeBanner from "../../components/bookcase/RecipeBanner";

const CookbookDetailPage = () => {
  const { id } = useParams();

  const { data: cookbook, isLoading: isCookbookLoading } = useGetCookbook(
    parseInt(id ?? "")
  );
  const { data: author, isLoading: isAuthorLoading } = useGetUser(
    cookbook?.authorId ?? 1
  );

  const { data: recipes, isLoading: isRecipesLoading } =
    useGetAllRecipesInCookbook(cookbook?.id ?? 1);

  return (
    <PageLayout>
      {isCookbookLoading || isAuthorLoading ? (
        <CircularProgress />
      ) : (
        <Box
          width={{ lg: "65%", md: "70%", sm: "80%", xs: "90%" }}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
          justifyContent="center"
          rowGap="20px"
        >
          {/* title and author */}
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize={{ lg: 33, md: 29, sm: 25, xs: 20 }}>
              {cookbook?.title}
            </Typography>
            <Typography fontSize={{ lg: 26, md: 23, sm: 19, xs: 14 }}>
              {author ? `by ${author.firstName} ${author.lastName}` : "N/A"}
            </Typography>
          </Box>
          {/* cover image */}
          {cookbook && cookbook.coverImageUrl && (
            <img
              src={cookbook?.coverImageUrl || ""}
              alt="cover"
              style={{
                width: "100%",
                contain: "cover",
                borderRadius: "7px",
                height: "auto",
              }}
            />
          )}
          {/* Description and Date */}
          <Box
            width="100%"
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
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
              {cookbook?.description}
            </Typography>

            {/* Date */}
            <Typography
              sx={{
                transform: "rotate(-90deg)",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              fontSize={{ lg: 20, md: 18, sm: 16, xs: 14 }}
            >
              {cookbook?.datePublished.toDateString()}
            </Typography>
          </Box>
          {/* recipes */}
          <Box width="100%">
            <Typography fontSize={{ lg: 30, md: 27, sm: 24, xs: 20 }}>
              Recipes
            </Typography>
            {recipes && recipes.length > 0 && !isRecipesLoading ? (
              <>
                {recipes.map((recipe) => (
                  <RecipeBanner key={recipe.id} recipe={recipe} />
                ))}
                <RecipeBanner />
              </>
            ) : (
              <RecipeBanner />
            )}
          </Box>
        </Box>
      )}
    </PageLayout>
  );
};

export default CookbookDetailPage;
