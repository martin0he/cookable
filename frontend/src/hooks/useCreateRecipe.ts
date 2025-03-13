import { useMutation } from "react-query";
import api from "../services/api";
import { queryClient } from "../main";

const createRecipe = async (recipeData: {
  authorId: number;
  cookbookId: number;
  title: string;
  description: string;
  imageUrl: string;
  ingredients: string[];
  instructions: { summary: string; details: string }[];
  tags: string[];
  expectedDuration: number;
}) => {
  const response = await api.post("/recipes", recipeData);
  return response.data;
};

export const useCreateRecipe = () => {
  return useMutation(createRecipe, {
    onSuccess: (newRecipe) => {
      queryClient.invalidateQueries("recipes");
      console.log("Recipe created successfully:", newRecipe);
    },
    onError: (error) => {
      console.error("Error creating recipe:", error);
    },
  });
};
