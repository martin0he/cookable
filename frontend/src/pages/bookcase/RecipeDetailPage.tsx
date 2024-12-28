import { useParams } from "react-router-dom";
import PageLayout from "../PageLayout";

const RecipeDetailPage = () => {
  const { id } = useParams();
  return (
    <PageLayout>
      <>
        <h1>Recipe Detail Page</h1>
        <p>Recipe ID: {id}</p>
      </>
    </PageLayout>
  );
};

export default RecipeDetailPage;
