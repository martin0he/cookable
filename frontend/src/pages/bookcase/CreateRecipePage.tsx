import { useParams } from "react-router-dom";
import PageLayout from "../PageLayout";

const CreateRecipePage = () => {
  const { id: cookbookId } = useParams();

  return (
    <PageLayout>
      <p>jhguh</p>
    </PageLayout>
  );
};

export default CreateRecipePage;
