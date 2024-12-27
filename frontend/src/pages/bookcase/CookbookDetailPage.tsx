import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import PageLayout from "../PageLayout";

const CookbookDetailPage = () => {
  const { id } = useParams(); // Access the cookbook ID from the URL

  return (
    <PageLayout>
      <>
        <Typography variant="h4">Cookbook Details</Typography>
        <Typography>Cookbook ID: {id}</Typography>
        {/* Fetch and display cookbook details using the ID */}
      </>
    </PageLayout>
  );
};

export default CookbookDetailPage;
